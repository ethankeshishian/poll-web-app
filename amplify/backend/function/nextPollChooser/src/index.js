/* Amplify Params - DO NOT EDIT
	AUTH_CS97POLLWEBAPPA7BC17B0_USERPOOLID
	ENV
	REGION
	STORAGE_POLLSDYNAMODB_ARN
	STORAGE_POLLSDYNAMODB_NAME
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_POLLSDYNAMODB_ARN
	STORAGE_POLLSDYNAMODB_NAME
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const cognitoID = new AWS.CognitoIdentityServiceProvider();

const UserPoolId = process.env.AUTH_CS97POLLWEBAPPA7BC17B0_USERPOOLID

let tableName = "polls";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

exports.handler = async (event) => {
  // Query for existing suggested polls
  let suggestedPolls = await getSuggestedPolls();
  let sanitizedSuggestions = [];

  for (const suggestion of suggestedPolls) {
    if (
      suggestion &&
      suggestion.results &&
      suggestion.results.suggestions_total != undefined
    )
      sanitizedSuggestions.push(suggestion);

    // delete the entry from database
    await deleteSuggestion(suggestion.id);
  }

  // Sort by votes #
  sanitizedSuggestions.sort(
    (a, b) => b.results.suggestions_total - a.results.suggestions_total
  );

  // Choose a winner
  let winningSuggestion = sanitizedSuggestions[0];

  // Give default poll if no suggestions
  if (!winningSuggestion) {
    winningSuggestion = {
      poll_question: "Is this a placeholder question, because there were no suggestions?",
      poll_responses: [
        "Yeah, we had no suggestions sadly",
        "No, this is some sad attempt at irony by Arek"
      ]
    }
  }

  const latestPoll = await getLatestPoll();

  let data;
  // close the previous poll
  if (latestPoll[0])
    data = await closePreviousPoll(latestPoll[0].id);

  // compute results
  if (data && data.Attributes) {
    console.log(data);
    await computeAnalytics(latestPoll[0].id, data.Attributes);
  }

  // put winner into database
  await createPoll(winningSuggestion);
};

const computeAnalytics = async function(pollId, pollData) {
  const responses = pollData.results.responses;
  const responsesCount = responses.length

  for (const Username in responses) {
    const request = await cognitoID.adminGetUser({
      UserPoolId,
      Username
    }, (err, data) => {
      console.log("User Data:")
      console.log(data);
    });
  }
}

const getSuggestedPolls = async function () {
  return new Promise((resolve, reject) => {
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
        reject(err);
      } else {
        resolve(data.Items);
      }
    });
  });
};

const deleteSuggestion = async function (suggestionId) {
  return new Promise((resolve, reject) => {
    let queryParams = {
      TableName: tableName,
      Key: {
        id: suggestionId,
      },
    };

    dynamodb.delete(queryParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const dateTimeInPST = Date.now() - 2.88e+7

const createPoll = async function (suggestion) {
  return new Promise((resolve, reject) => {
    let queryParams = {
      TableName: tableName,
      Item: {
        // Create GUID here!
        id: `Poll_${Math.random() * Math.floor(1000)}`,
        type: "poll",
        poll_question: suggestion.poll_question,
        poll_responses: suggestion.poll_responses,
        timestamp: Date.now().toString(),
        poll_date: new Date(dateTimeInPST).setUTCHours(0, 0, 0, 0),
        results: {
          responses_totals: [0, 0],
          responses: {},
        },
        comments: [],
      },
      ConditionExpression: "attribute_not_exists(id)",
    };

    dynamodb.put(queryParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getLatestPoll = async function (req, res) {
  return new Promise((resolve, reject) => {
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
        reject(err);
      } else {
        resolve(data.Items);
      }
    });
  });
};

const closePreviousPoll = async function (pollId) {
  return new Promise((resolve, reject) => {
    let queryParams = {
      TableName: tableName,
      Key: {
        id: pollId,
      },
      UpdateExpression: "SET #timeClosed = :timeClosed",
      ExpressionAttributeValues: {
        ":timeClosed": Date.now().toString(),
      },
      ExpressionAttributeNames: {
        "#timeClosed": "timestamp_closed",
      },
      ReturnValues: "ALL_NEW",
    };

    dynamodb.update(queryParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
