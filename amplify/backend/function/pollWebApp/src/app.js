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

const pollRoutes = require("./handlers/poll");
const suggestionRoutes = require("./handlers/suggestions");

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "polls";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

const path = "/polls";
const latestPollSuffix = "/latest";
const singlePollSuffix = "/:poll";
const respondToPollSuffix = "/respond/:response";
const commentOnPollSuffix = "/comment";
const nextDaysPollsSuffix = "/suggested";
const voteOnNextDaysPollSuffix = "/vote";

const cognitoUserMiddleware = async (req, res, next) => {
  try {
    const IDP_REGEX = /.*\/.*,(.*)\/(.*):CognitoSignIn:(.*)/;
    const authProvider =
      req.apiGateway.event.requestContext.identity
        .cognitoAuthenticationProvider;
    const [, , , userId] = authProvider.match(IDP_REGEX);

    const cognito = new AWS.CognitoIdentityServiceProvider();
    const listUsersResponse = await cognito
      .listUsers({
        UserPoolId: process.env.AUTH_CS97POLLWEBAPPA7BC17B0_USERPOOLID,
        Filter: `sub = "${userId}"`,
        Limit: 1,
      })
      .promise();
    const user = listUsersResponse.Users[0];
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    req.user = { Username: null };
    next();
  }
};

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(cognitoUserMiddleware);

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

app.get(path + latestPollSuffix, pollRoutes.getLatestPoll);

/*****************************************
 * HTTP Get method to get active poll suggestions *
 * /polls/suggested
 *****************************************/

app.get(path + nextDaysPollsSuffix, suggestionRoutes.viewSuggestedPolls);

/********************************
 * HTTP Get method for getting all polls *
 ********************************/

app.get(path, pollRoutes.getAllPolls);

/*****************************************
 * HTTP Get method for get single poll *
 *****************************************/

app.get(path + singlePollSuffix, pollRoutes.getSinglePoll);

/*****************************************
 * HTTP Post method to respond to single poll *
 *****************************************/

app.post(
  path + singlePollSuffix + respondToPollSuffix,
  pollRoutes.respondToSinglePoll
);

/*****************************************
 * HTTP POST method for commenting on poll *
 *****************************************/

app.post(
  path + singlePollSuffix + commentOnPollSuffix,
  pollRoutes.commentOnSinglePoll
);

/*****************************************
 * HTTP Post method to vote on next day's poll *
 * /polls/suggested/:id/vote
 *****************************************/
app.post(
  path + nextDaysPollsSuffix + singlePollSuffix + voteOnNextDaysPollSuffix,
  suggestionRoutes.voteOnSuggestedPoll
);

/*****************************************
 * HTTP Post method to suggest a new poll for next day *
 * /polls/suggested
 *****************************************/
app.post(path + nextDaysPollsSuffix, suggestionRoutes.createNewSuggestedPoll);

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = { app, tableName, dynamodb };
