import awsconfig from './aws-exports';

// Amplify doesn't support multiple redirect uri's well (ughhh)
// This workaround will change the redirect uri based on our environment
// (Development: localhost, Otherwise: pollify.xyz)
// Read: https://github.com/aws-amplify/amplify-cli/issues/2792

const { NODE_ENV } = process.env;
console.log(NODE_ENV);
const DEFAULT_URL = 'http://localhost:3000/';

if (NODE_ENV === 'development') {
    awsconfig.oauth.redirectSignIn = DEFAULT_URL;
    awsconfig.oauth.redirectSignOut = DEFAULT_URL;
}
export default awsconfig;