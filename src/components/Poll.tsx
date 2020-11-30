import React from 'react';
import PollButton from './PollButton';
import '../styles/Poll.css';

function Poll(props: { question: string; option1: string; option2: string }) {
  return (
    <>
      <h3 className="question">{props.question}</h3>
      <PollButton question={props.option1} />
      <PollButton question={props.option2} />
    </>
  );
}

export default Poll;
