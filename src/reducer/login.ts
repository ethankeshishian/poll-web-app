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
        if (user) {
            Auth.userAttributes(user)
            .then((attributes) => {
                dispatch({
                    type: 'login',
                    user: attributes
                })
            })
        } 
    })
    .catch((e) => {
        dispatch({
            type: 'failed'
        })
    })
}

const logout = async (dispatch : any) => {
    Auth.signOut()
    .then(() => {
        dispatch({
            type: 'logout'
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
                // Add other stuff to be updated here
            });
        }
        case 'logout': {
            return state.withMutations((val : any) => {
                val.setIn(['user'], null);
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
    Login, OAuth, userInfo, logout
}