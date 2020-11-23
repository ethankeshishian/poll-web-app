import React from 'react';
import '../styles/PollButton.css';

//Typscript note: the following would have been "props" in JS.
//This is saying props is of type object, which contains "question" of type string
function PollButton(props: { question: string }) {
  return <button className="option-btn">{props.question}</button>;
}
export default PollButton;
