import Immutable from 'immutable';

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../awsconfig";

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
                    user: attributes,
                    key: user
                })
            })
        } 
    })
    .catch((e) => {
        console.log(e)
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

const attributes = async (dispatch : any, attributes : any, user : any) => {
    Auth.updateUserAttributes(user, {
        name: attributes.name,
        "custom:age": attributes.age,
        gender: attributes.gender,
        "custom:location": attributes.location
    })
    .then(() => userInfo(dispatch));
}

const defaultState = Immutable.fromJS({
    key: null,
    user: null,
    error: false
});

const Account = (state = defaultState, action : any) => {
    switch (action.type) {
        case 'login': {
            return state.withMutations((val : any) => {
                val.setIn(['user'], action.user);
                val.setIn(['key'], action.key);
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
    Account, OAuth, userInfo, logout, attributes
}