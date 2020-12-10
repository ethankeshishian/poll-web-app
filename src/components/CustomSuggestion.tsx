import React from 'react';
import '../styles/Suggestion.css';
import InvisibleTextBox from './InvisibleTextBox'

import { connect } from 'react-redux';
import { Actions } from '../reducer';

//Typscript note: the following would have been "props" in JS.
//This is saying props is of type object, which contains "question" of type string
function CustomSuggestion(props: any) {
  return (
    <>
      <button className="option-btn">
        <InvisibleTextBox subject="Poll Question" onChange={(text: any) => props.updateQuestion(text.target.value)}/>
      </button>
      <button className="suggest-option-btn">
        <InvisibleTextBox subject="Your Option A" onChange={(text: any) => props.updateResponseA(text.target.value)}/>
      </button>
      <button className="suggest-option-btn">
        <InvisibleTextBox subject="Your Option B" onChange={(text: any) => props.updateResponseB(text.target.value)}/>
    </button>
    </>
  )
}

const mapStateToProps = (state: any) => {
    return {
    };
  };

const mapDispatchToProps = (dispatch : any) => {
    return {
      updateQuestion: (text: string) => {
        Actions.suggestion.updateCustomPollQuestion(dispatch, text);
      },
      updateResponseA: (text: string) => {
        Actions.suggestion.updateCustomPollResponseA(dispatch, text);
      },
      updateResponseB: (text: string) => {
        Actions.suggestion.updateCustomPollResponseB(dispatch, text);
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(CustomSuggestion);
