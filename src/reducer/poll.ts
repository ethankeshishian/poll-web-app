import Immutable from "immutable";

import Amplify, { API } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const latest = async (dispatch: any) => {
  const poll = await API.get("pollApi", "/polls/latest", {});
  dispatch({
    type: "latest",
    poll: poll[0],
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

const comment = async (dispatch: any, comment: string) => {
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
        API.post("pollApi", `/polls/${state.getIn(["poll", "id"])}/comment`, {
            body: {
                comment: action.comment,
            },
        });
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
