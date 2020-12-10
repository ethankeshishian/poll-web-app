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
        timestamp: Date.now().toString(),
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

/*****************************************
 * HTTP Post method to suggest a new poll for next day *
 * /polls/suggested
 *****************************************/
const createNewSuggestedPoll = function (req, res) {
  const userId = req.user.Username;

  const pollQuestion = req.body.poll_question;
  const pollResponses = req.body.poll_responses;

  if (!pollQuestion || !pollResponses) {
    res.statusCode = 400;
    res.json({
      error: "Body Requires: poll_question and poll_responses",
    });
    return;
  }

  if (!userId) {
    res.statusCode = 401;
    res.json({ error: "Unauthenticated User" });
    return;
  }

  // Do more checking on pollQuestion and pollResponses!!!

  let queryParams = {
    TableName: tableName,
    Item: {
      id: `Suggestion_${userId}`,
      type: "poll_suggestion",
      poll_question: pollQuestion,
      poll_responses: pollResponses,
      timestamp: Date.now().toString(),
      suggested_by: userId,
      results: {
        suggestions: {
          [userId]: {
            timestamp: Date.now().toString(),
          }
        },
        suggestions_total: 1,
      },
    },
    ConditionExpression: "attribute_not_exists(id)",
  };

  dynamodb.put(queryParams, (err, data) => {
    if (err) {
      console.log(err);
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
  createNewSuggestedPoll,
};
