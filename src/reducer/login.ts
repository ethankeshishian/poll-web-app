import Immutable from 'immutable';

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const OAuth = async (dispatch : any) => {
    await Auth.federatedSignIn()
    .then(() => {
        return Auth.currentAuthenticatedUser();
    })
    .then((user) => {
        dispatch({
            type: 'login',
            user: user
        });
    })
}

const defaultState = Immutable.fromJS({
    user: null,
    error: ""
});

const Login = (state = defaultState, action : any) => {
    switch (action.type) {
        case 'login': {
            return state.withMutations((val : any) => {
                val.setIn(['user'], action.user);
                // Add other stuff to be updated here
            });
        }
        case 'failed': {
            return state.withMutations((val : any) => {
                val.setIn('error', action.error);
            });
        }
        default: {
            return state;
        }
    }
}

export {
    Login, OAuth
}