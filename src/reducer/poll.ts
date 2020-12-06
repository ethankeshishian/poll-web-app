import Immutable from "immutable";

import Amplify, { API } from "aws-amplify";
import awsconfig from "../awsconfig";

Amplify.configure(awsconfig);

const latest = () => async (dispatch: any, getState: any) => {
  const polls = await API.get("pollApi", "/polls/latest", {});

  let poll = {} as any;

  if (polls[0])
    poll = polls[0];

  const state = getState();
  console.log(state);
  const username = state.Account.get("key").username;
  console.log(username)
  const response = poll.results.responses[username];
  console.log(response);
  console.log(response.response)

  if (response) {
    dispatch({
      type: "respond",
      responseId: response.response
    })
  }

  dispatch({
    type: "latest",
    poll,
  });
};

const all = async (dispatch: any) => {
    const polls = await API.get("pollApi", "/polls", {});;
    dispatch({
        type: "all",
        poll: polls,
    });
}

const respond = async (dispatch: any, pollId: String, responseId: Number) => {
  dispatch({
    type: "respond",
    responseId,
  });

  const responsePoll = await API.post(
    "pollApi",
    `/polls/${pollId}/respond/${responseId}`,
    {}
  );

  dispatch({
    type: "latest",
    poll: responsePoll.Attributes,
  });
};

const comment = async (dispatch: any, comment: string, pollId: String) => {

    await API.post("pollApi", `/polls/${pollId}/comment`, {
        body: {
            comment: comment,
        },
    });

    dispatch({
        type: "comment",
        comment: comment,
    });
};

const defaultState = Immutable.fromJS({
  poll: {},
  all: null,
  response: null,
  comment: null,
});

const Polls = (state = defaultState, action: any) => {
  switch (action.type) {
    case "latest": {
      return state.withMutations((val: any) => {
        val.setIn(["poll"], action.poll);
        val.setIn(["comment"], null);
      });
    }
    case "all": {
        return state.withMutations((val: any) => {
          val.setIn(["all"], action.all);
        });
      }
    case "respond": {
      return state.withMutations((val: any) => {
        val.setIn(["response"], action.responseId);
      });
    }
    case "comment": {
        return state.withMutations((val: any) => {
            val.setIn(["comment"], action.comment);
        });
    }
    default: {
      return state;
    }
  }
};

export { Polls, latest, respond, comment, all };
