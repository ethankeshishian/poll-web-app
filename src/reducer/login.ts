import Immutable from 'immutable';

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const OAuth = async () => {
    await Auth.federatedSignIn({provider: "Google" as any});
}

const userInfo = async (dispatch : any) => {
    Auth.currentAuthenticatedUser()
    .then((user) => {
        dispatch({
            type: 'login',
            user: user
        })
    })
    .catch((e) => {
        console.log(e)
        dispatch({
            type: 'failed'
        })
    })
}

const defaultState = Immutable.fromJS({
    user: null,
    error: false
});

const Login = (state = defaultState, action : any) => {
    switch (action.type) {
        case 'login': {
            return state.withMutations((val : any) => {
                val.setIn(['user'], action.user);
                val.setIn(['error'], false)
                // Add other stuff to be updated here
            });
        }
        case 'failed': {
            return state.withMutations((val : any) => {
                val.setIn(['error'], true);
            });
        }
        default: {
            return state;
        }
    }
}

export {
    Login, OAuth, userInfo
}