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
      <h3 className="header">Vote for Tomorrow's Poll</h3>
      {props.ourVote && <h4 className="sub-header">You've already voted today</h4>}

        {props.allSuggestions.map((suggestion: any, index: number) => (
            <Suggestion key={suggestion.id}
              poll={{poll_question: suggestion.poll_question, poll_responses: suggestion.poll_responses}}
              onClick={() => {props.voteSuggestion(suggestion.id)}}/>
        ))}

        <CustomSuggestion></CustomSuggestion>

      <SmallButtonDefault onClick={props.createSuggestion}>Suggest Poll</SmallButtonDefault>
    </div>
  </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    allSuggestions: state.Suggestions.get('allSuggestions'),
    ourVote: state.Suggestions.get('votedSuggestion'),
    customPollSuggestion: state.Suggestions.get('currentCustomPollSuggestion')
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionBox);