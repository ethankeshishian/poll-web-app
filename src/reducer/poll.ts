import Immutable from 'immutable';

import Amplify, { API } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const latest = async (dispatch : any) => {
    const poll = await API.get("pollApi", "/polls/latest", {});
    dispatch({
        type: 'latest',
        poll: poll[0]
    });
}

const defaultState = Immutable.fromJS({
    poll: {}
});

const Polls = (state = defaultState, action : any) => {
    switch (action.type) {
        case 'latest': {
            return state.withMutations((val : any) => {
                val.setIn(['poll'], action.poll);
            });
        }
        default: {
            return state;
        }
    }
}

export { 
    Polls, latest
}