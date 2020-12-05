import Immutable from "immutable";

import Amplify, { API } from "aws-amplify";
import awsconfig from "../awsconfig";

Amplify.configure(awsconfig);

const allSuggestions = () => async (dispatch: any, getState: any) => {
  const suggestions = await API.get("pollApi", "/polls/suggested", {});
  dispatch({
    type: "all",
    suggestions,
  });
  console.log(getState());
  const ourUsername = getState().Account.get("key")?.username;
  for (const suggestion of suggestions) {
    if (suggestion.suggested_by === ourUsername) {
      dispatch({
        type: "vote",
        suggestionId: suggestion.id,
      });
    }
  }
};

const vote = async (dispatch: any, suggestionId: string) => {
  const response = await API.post(
    "pollApi",
    `/polls/suggested/${suggestionId}/vote`,
    {}
  );

  dispatch({
    type: "vote",
    suggestionId,
  });
};

const create = async (
  dispatch: any,
  poll: { poll_question: string; poll_responses: string[] }
) => {
  const createdPoll = await API.post("pollApi", "/polls/suggested", {
    body: {
      poll_question: poll.poll_question,
      poll_responses: poll.poll_responses,
    },
  });

  dispatch(allSuggestions());
};

const defaultState = Immutable.fromJS({
  allSuggestions: [],
  votedSuggestion: null,
});

const Suggestions = (state = defaultState, action: any) => {
  switch (action.type) {
    case "all": {
      return state.withMutations((val: any) => {
        val.setIn(["allSuggestions"], action.suggestions);
      });
    }
    case "vote": {
      return state.withMutations((val: any) => {
        val.setIn(["votedSuggestion"], action.suggestionId);
      });
    }
    case "create": {
      return state;
    }
    default: {
      return state;
    }
  }
};

export { Suggestions, allSuggestions, create, vote };
