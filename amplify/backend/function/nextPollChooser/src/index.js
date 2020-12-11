/* Amplify Params - DO NOT EDIT
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
    winningSuggestion = getDefaultPoll();
  }

  const latestPoll = await getLatestPoll();

  let data;
  // close the previous poll
  if (latestPoll[0])
    data = await closePreviousPoll(latestPoll[0].id);

  // compute results
  if (data && data.Attributes) {
    await computeAnalytics(latestPoll[0].id, data.Attributes);
  }

  // put winner into database
  await createPoll(winningSuggestion);
};

const computeAnalytics = async function(pollId, pollData) {
  return new Promise(async (resolve, reject) => {
  const responses = pollData.results.responses;
  const responsesCount = responses.length;

  const gendersTotal = {
    Male: 0,
    Female: 0,
    Other: 0
  };

  const genders0 = {
    Male: 0,
    Female: 0,
    Other: 0
  };

  const genders1 = {
    Male: 0,
    Female: 0,
    Other: 0
  };

  const ages = [];

  const IsValidGender = function(gender) {
    return gender == "Male" || gender == "Female" || gender == "Other"
  }

  for (const Username in responses) {
    const attributes = await getUserAttributes(Username);
    console.log("User Attributes:")
    console.log(attributes);

    for (const attribute of attributes) {
      if (attribute.Name == "gender") {
        if (!IsValidGender(attribute.Value)) continue;
        gendersTotal[attribute.Value]++;

        if (responses[Username].response === 0) {
          genders0[attribute.Value]++;
        } else if (responses[Username].response === 1) {
          genders1[attribute.Value]++;
        }
      }

      if (attribute.Name == "custom:age") {
        ages.push(attribute.Value);
      }
    }
  }

  const totalAge = ages.reduce((acc, c) => acc + c, 0); 
  const averageAge = totalAge / ages.length;

  let queryParams = {
    TableName: tableName,
    Key: {
      id: pollId,
    },
    UpdateExpression: "SET results.#analytics = :analytics",
    ExpressionAttributeValues: {
      ":analytics": {
        genders: [
          genders0,
          genders1
        ],
        genders_totals: gendersTotal,
        average_age: averageAge
      }
    },
    ExpressionAttributeNames: {
      "#analytics": "analytics",
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
}

const getDefaultPoll = function() {
  return {
    poll_question: "Is this a placeholder question, because there were no suggestions?",
    poll_responses: [
      "Yeah, we had no suggestions sadly",
      "No, this is some sad attempt at irony by Arek"
    ]
  }
}

const getUserAttributes = async function(Username) {
  return new Promise(async (resolve, reject) => {
    const request = await cognitoID.adminGetUser({
      UserPoolId,
      Username
    }, (err, data) => {
      if (err)
        reject(err);
      else
        resolve(data.UserAttributes);
    });
  })
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
