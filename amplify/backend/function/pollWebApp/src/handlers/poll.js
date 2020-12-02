const { dynamodb, tableName } = require("./constants");

/********************************
 * HTTP Get method for getting latest poll *
 ********************************/

const getLatestPoll = function (req, res) {
  let queryParams = {
    TableName: tableName,
    IndexName: "timestampIndex",
    KeyConditionExpression: "#key = :value",
    ExpressionAttributeNames: {
      "#key": "type",
    },
    ExpressionAttributeValues: {
      ":value": "poll",
    },
    // Get in descending time order (newest one first)
    ScanIndexForward: false,
    Limit: 1,
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

/********************************
 * HTTP Get method for getting all polls *
 ********************************/

const getAllPolls = function (req, res) {
  let queryParams = {
    TableName: tableName,
    IndexName: "timestampIndex",
    KeyConditionExpression: "#key = :value",
    ExpressionAttributeNames: {
      "#key": "type",
    },
    ExpressionAttributeValues: {
      ":value": "poll",
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
 * HTTP Get method for get single poll *
 *****************************************/

const getSinglePoll = function (req, res) {
  const pollId = req.params["poll"];

  let queryParams = {
    TableName: tableName,
    Key: {
      id: pollId,
    },
  };

  dynamodb.get(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: "Could not load items: " + err });
    } else {
      res.json(data);
    }
  });
};

/*****************************************
 * HTTP Post method to respond to single poll *
 *****************************************/

const respondToSinglePoll = function (req, res) {
  const pollId = req.params["poll"];
  //const responseId = convertUrlType(req.params["response"], "N");
  const responseId = req.params["response"];
  const userId = req.user.Username;

  const responseInt = parseInt(responseId);

  if (responseInt === NaN) {
    res.statusCode = 400;
    res.json({ error: "Invalid Response Id" });
    return;
  }

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
    UpdateExpression: `ADD results.responses_totals[${responseInt}] :val SET results.responses.#userId = :userResponse`,
    ConditionExpression:
      "#type = :type AND attribute_not_exists(timestamp_closed) AND attribute_not_exists(results.responses.#userId)",
    ExpressionAttributeValues: {
      ":val": 1,
      ":userResponse": {
        response: responseInt,
        timestamp: new Date().toISOString(),
      },
      ":type": "poll",
    },
    ExpressionAttributeNames: {
      "#userId": userId,
      "#type": "type",
    },
    ReturnValues: "ALL_NEW",
  };

  dynamodb.update(queryParams, (err, data) => {
    if (err) {
      console.log(err);
      res.statusCode = 404;
      res.json({ error: "Item not found" });
    } else {
      res.json(data);
    }
  });
};

/*****************************************
 * HTTP POST method for commenting on poll *
 *****************************************/

const commentOnSinglePoll = function (req, res) {
  const pollId = req.params["poll"];
  const userId = req.user.Username;

  const commentText = req.body.comment;

  if (!commentText) {
    res.statusCode = 400;
    res.json({ error: "No Comment" });
    return;
  }

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
      "SET #comments = list_append(:newComment, if_not_exists(#comments, :empty_list))",
    ConditionExpression: "#type = :type",
    ExpressionAttributeValues: {
      ":newComment": [
        {
          commentText,
          user_id: userId,
          timestamp: new Date().toISOString(),
        },
      ],
      ":empty_list": [],
      ":type": "poll",
    },
    ExpressionAttributeNames: {
      "#comments": "comments",
      "#type": "type",
    },
    ReturnValues: "ALL_NEW",
  };

  dynamodb.update(queryParams, (err, data) => {
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
  getLatestPoll,
  getAllPolls,
  getSinglePoll,
  respondToSinglePoll,
  commentOnSinglePoll,
};
