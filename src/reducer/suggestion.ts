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

const create = () => async (dispatch: any, getState: any) => {
  const state = getState().Suggestions;
  const createdPoll = await API.post("pollApi", "/polls/suggested", {
    body: {
      poll_question: state.getIn(["currentCustomPollSuggestion", "poll_question"]),
      poll_responses: [
        state.getIn(["currentCustomPollSuggestion", "poll_responses_a"]),
        state.getIn(["currentCustomPollSuggestion", "poll_responses_b"])
      ],
    },
  });

  dispatch(allSuggestions());
};

const showSuggestions = (dispatch: any, showSuggestion: boolean) => {
  dispatch({
    type: "show",
    showSuggestion,
  });
}

const updateCustomPollQuestion = (dispatch: any, question: string) => {
  dispatch({
    type: "update_question",
    question,
  });
}

const updateCustomPollResponseA = (dispatch: any, response: string) => {
  dispatch({
    type: "update_response_a",
    response,
  });
}

const updateCustomPollResponseB = (dispatch: any, response: string) => {
  dispatch({
    type: "update_response_b",
    response,
  });
}

const defaultState = Immutable.fromJS({
  allSuggestions: [],
  votedSuggestion: null,
  showSuggestions: false,
  currentCustomPollSuggestion: {
    poll_question: "",
    poll_responses_a: "",
    poll_responses_b: ""
  }
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
    case "show": {
      return state.withMutations((val: any) => {
        val.setIn(["showSuggestions"], action.showSuggestion);
      });
    }
    case "update_question": {
      return state.withMutations((val: any) => {
        val.setIn(["currentCustomPollSuggestion", "poll_question"], action.question);
      });
    }
    case "update_response_a": {
      return state.withMutations((val: any) => {
        val.setIn(["currentCustomPollSuggestion", "poll_responses_a"], action.response);
      });
    }
    case "update_response_b": {
      return state.withMutations((val: any) => {
        val.setIn(["currentCustomPollSuggestion", "poll_responses_b"], action.response);
      });
    }
    default: {
      return state;
    }
  }
};

export { Suggestions, allSuggestions, create, vote, showSuggestions, updateCustomPollQuestion, updateCustomPollResponseA, updateCustomPollResponseB };
