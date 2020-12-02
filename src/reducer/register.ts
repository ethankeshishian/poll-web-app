import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

import Immutable from 'immutable';

const register = (attribute: any) => {
    switch (attribute) {
        
    }
}

const defaultState = Immutable.fromJS({
    user: {},
    registerSuccess: false
});

const Register = (state = defaultState, action : any) => {
    switch (action.type) {
        case 'submitted': {
            return state.withMutations((val : any) => {
                val.setIn(['user', 'email'], action.email);
                val.setIn(['user', 'profileId'], action.profileId);
                // Add other stuff to be updated here
            });
        }
        case 'complete': {
            return state.withMutations((val : any) => {
                val.set('registerSuccess', true);
            })
        }
        default: {
            return state;
        }
    }
}

export {
    Register
}