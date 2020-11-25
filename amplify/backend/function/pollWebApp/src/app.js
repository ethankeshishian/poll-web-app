/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_POLLSDYNAMODB_ARN
	STORAGE_POLLSDYNAMODB_NAME
	STORAGE_RESPONSESDYNAMODB_ARN
	STORAGE_RESPONSESDYNAMODB_NAME
Amplify Params - DO NOT EDIT */ /*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const AWS = require("aws-sdk");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var bodyParser = require("body-parser");
var express = require("express");

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "polls";
let responsesTableName = "responses";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
  responsesTableName = responsesTableName + "-" + process.env.ENV;
}

const path = "/polls";
const latestPollSuffix = "/latest";
const singlePollSuffix = "/:poll";
const respondToPollSuffix = "/respond/:response";

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/********************************
 * HTTP Get method for getting latest poll *
 ********************************/

app.get(path + latestPollSuffix, function (req, res) {
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
});

/********************************
 * HTTP Get method for getting all polls *
 ********************************/

app.get(path, function (req, res) {
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
});

/*****************************************
 * HTTP Get method for get single poll *
 *****************************************/

app.get(path + singlePollSuffix, function (req, res) {
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
});

/*****************************************
 * HTTP Post method to respond to single poll *
 *****************************************/

app.post(path + singlePollSuffix + respondToPollSuffix, function (req, res) {
  const pollId = req.params["poll"];
  //const responseId = convertUrlType(req.params["response"], "N");
  const responseId = req.params["response"];

  let queryParams = {
    TableName: tableName,
    Key: {
      id: pollId,
    },
    UpdateExpression: "ADD results.responses.#responseId :val",
    ConditionExpression: "attribute_not_exists(timestamp_closed)",
    ExpressionAttributeValues: {
      ":val": 1,
    },
    ExpressionAttributeNames: {
      "#responseId": responseId,
    },
    ReturnValues: "ALL_NEW",
  };

  dynamodb.update(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: "Could not load items: " + err });
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
