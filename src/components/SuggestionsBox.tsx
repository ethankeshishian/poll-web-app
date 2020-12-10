import React, { useState } from "react";
import Background from './Background';
import InfoBox from './InfoBox';
import '../styles/global.css';
import '../styles/SuggestionBox.css';

import { connect } from 'react-redux';
import { Actions } from '../reducer';
import Suggestion from "./Suggestion";
import CustomSuggestion from "./CustomSuggestion";
import SmallButtonDefault from "./SmallButtonDefault"

function SuggestionBox(props : any) {

  return (
  <>
    <Background />
    <div className="popup-window">
      <button className="close-window" onClick={props.hideSuggestions}>X</button>
      <h3 className="header">Tomorrow's Poll</h3>
      {props.ourVote && <h4 className="sub-header">You've already voted for the following poll:</h4>}

        {props.allSuggestions.map((suggestion: any, index: number) => {
            if (!props.ourVote || props.ourVote === suggestion.id) return (
              <Suggestion key={suggestion.id}
                poll={{poll_question: suggestion.poll_question, poll_responses: suggestion.poll_responses}}
                onClick={() => {!props.ourVote && (props.user ? props.voteSuggestion(suggestion.id) : props.oauth())}}/>
            )
        })}

        {!props.ourVote &&
        <>
          <h4 className="suggest-header">Have a different suggestion? Submit it here:</h4>

          <CustomSuggestion></CustomSuggestion>

          <SmallButtonDefault onClick={props.createSuggestion}>Suggest Poll</SmallButtonDefault>
        </>
        }
    </div>
  </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    allSuggestions: state.Suggestions.get('allSuggestions'),
    ourVote: state.Suggestions.get('votedSuggestion'),
    customPollSuggestion: state.Suggestions.get('currentCustomPollSuggestion'),
    user: state.Account.get('user'),
  };
};

const mapDispatchToProps = (dispatch : any) => {
  return {
    hideSuggestions: () => {
        Actions.suggestion.showSuggestions(dispatch, false);
    },
    voteSuggestion: (id: string) => {
      Actions.suggestion.vote(dispatch, id);
    },
    createSuggestion: () => {
      dispatch(Actions.suggestion.create())
    },
    oauth: () => {
      Actions.account.OAuth();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionBox);