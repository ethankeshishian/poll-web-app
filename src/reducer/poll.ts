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
  const key = state.Account.get("key");

  if (key) {
    const username = key.username;
    const response = poll.results.responses[username];
    if (response) {
      dispatch({
        type: "respond",
        responseId: response.response
      })
    }
  }

  dispatch({
    type: "latest",
    poll,
  });
};

const all = async (dispatch: any) => {
    const polls = await API.get("pollApi", "/polls", {});;
    dispatch({
        type: "allPolls",
        allPolls: polls,
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
  all: {},
  response: null,
  comment: null,
});

const Polls = (state = defaultState, action: any) => {
  switch (action.type) {
    case "latest": {

      /* Calculate the totals from the responses, by counting the number of '0' responses
         and the number of '1' responses. */
      const results = [0, 0];
      Object.values(action.poll.results.responses)
        .map((response: any) => response.response)
        .forEach((responseId: number) => results[responseId]++);

      action.poll.results.responses_totals = results;

      return state.withMutations((val: any) => {
        val.setIn(["poll"], action.poll);
        val.setIn(["comment"], null);
      });
    }
    case "allPolls": {
      const allPolls = {} as any;
      for (const poll of Object.values(action.allPolls) as {poll_date: string}[]) {
        if (!poll.poll_date) continue;
        
        allPolls[poll.poll_date] = poll;
      }

      return state.withMutations((val: any) => {
        val.setIn(["all"], allPolls);
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
