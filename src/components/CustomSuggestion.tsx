import React from 'react';
import '../styles/PollButton.css';
import '../styles/Suggestion.css';
import InvisibleTextBox from './InvisibleTextBox'

import { connect } from 'react-redux';
import { Actions } from '../reducer';

//Typscript note: the following would have been "props" in JS.
//This is saying props is of type object, which contains "question" of type string
function CustomSuggestion(props: any) {
  return (
    <button className="option-btn">
        <InvisibleTextBox subject="Question..." onChange={(text) => props.updateQuestion(text.target.value)}/>
        <br/>
        <div className="responses-box">
            <div className="response-text">
                <InvisibleTextBox subject="Response A" onChange={(text) => props.updateResponseA(text.target.value)}/>
            </div>
            |
            <div className="response-text">
                <InvisibleTextBox subject="Response B" onChange={(text) => props.updateResponseB(text.target.value)}/>
            </div>
        </div>
    </button>
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
