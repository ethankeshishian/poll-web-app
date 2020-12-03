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
        response: response
    })
}

const comment = async (dispatch : any, comment : string) => {
    dispatch({
        type: 'comment',
        comment: comment
    })
}

const defaultState = Immutable.fromJS({
    poll: {},
    response: null,
    comment: null
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
        case 'comment': {
            API.post("pollApi", `/polls/${state.getIn(['poll', 'id'])}comment`, {
                body: {
                    "comment": action.comment
                }
            });
            return state.withMutations((val : any) => {
                val.setIn(['comment'], action.comment)
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