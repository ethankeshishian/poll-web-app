import React from 'react';
import '../styles/PollButton.css';

//Typscript note: the following would have been "props" in JS.
//This is saying props is of type object, which contains "question" of type string
function PollButton(props: { text: string , onClick?: React.MouseEventHandler}) {
  return <button className="option-btn" onClick={props.onClick}>{props.text}</button>;
}
export default PollButton;
