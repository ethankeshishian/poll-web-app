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

const respond = async (dispatch : any, responseId: Number) => {
    const response = responseId;
    dispatch({
        type: 'respond',
        response
    })
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
        case 'respond': {
            API.post("pollApi", `/polls/${state.getIn(['poll', 'id'])}/respond/${action.response}`, {});
            return state.withMutations((val : any) => {
                val.setIn(['response'], action.response)
            });
        }
        default: {
            return state;
        }
    }
}

export { 
    Polls, latest, respond
}