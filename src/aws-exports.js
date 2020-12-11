/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "us-west-2",
    "aws_dynamodb_all_tables_region": "us-west-2",
    "aws_dynamodb_table_schemas": [
        {
            "tableName": "polls-devv",
            "region": "us-west-2"
        },
        {
            "tableName": "responses-devv",
            "region": "us-west-2"
        }
    ],
    "aws_cognito_identity_pool_id": "us-west-2:4403d429-cb31-430c-a0dd-f24f206e72b9",
    "aws_cognito_region": "us-west-2",
    "aws_user_pools_id": "us-west-2_2eBg1TJ3s",
    "aws_user_pools_web_client_id": "4apf27jiacuq5o6r6ene1dudjp",
    "oauth": {
        "domain": "cs97pollwebappa7bc17b0-a7bc17b0-devv.auth.us-west-2.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "https://pollify.xyz/",
        "redirectSignOut": "https://pollify.xyz/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS",
    "aws_cloud_logic_custom": [
        {
            "name": "pollApi",
            "endpoint": "https://l3pq05sl1m.execute-api.us-west-2.amazonaws.com/devv",
            "region": "us-west-2"
        }
    ]
};

export default awsmobile;
