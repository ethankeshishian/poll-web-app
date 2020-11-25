const { dynamodb, tableName } = require("./constants");

/*****************************************
 * HTTP Get method to get active poll suggestions *
 * /polls/suggested
 *****************************************/

const viewSuggestedPolls = function (req, res) {
  let queryParams = {
    TableName: tableName,
    IndexName: "timestampIndex",
    KeyConditionExpression: "#key = :value",
    ExpressionAttributeNames: {
      "#key": "type",
    },
    ExpressionAttributeValues: {
      ":value": "poll_suggestion",
    },
    // Get in descending time order (newest one first)
    ScanIndexForward: false,
  };

  dynamodb.query(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: "Could not load items: " + err });
    } else {
      res.json(data.Items);
    }
  });
};

/*****************************************
 * HTTP Post method to vote on next day's poll *
 * /polls/suggested/:id/vote
 *****************************************/
const voteOnSuggestedPoll = function (req, res) {
  const pollId = req.params["poll"];
  //const responseId = convertUrlType(req.params["response"], "N");
  const userId = req.user.Username;

  if (!userId) {
    res.statusCode = 401;
    res.json({ error: "Unauthenticated User" });
    return;
  }

  let queryParams = {
    TableName: tableName,
    Key: {
      id: pollId,
    },
    UpdateExpression:
      "ADD results.suggestions_total :val SET results.suggestions.#userId = :userResponse",
    ConditionExpression:
      "#type = :type AND attribute_not_exists(results.suggestions.#userId)",
    ExpressionAttributeValues: {
      ":val": 1,
      ":userResponse": {
        timestamp: new Date().toISOString(),
      },
      ":type": "poll_suggestion",
    },
    ExpressionAttributeNames: {
      "#userId": userId,
      "#type": "type",
    },
    ReturnValues: "ALL_NEW",
  };

  dynamodb.update(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.json({ error: "Item not found" });
    } else {
      res.json(data);
    }
  });
};

module.exports = {
  viewSuggestedPolls,
  voteOnSuggestedPoll,
};
