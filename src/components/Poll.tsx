import React from 'react';
import PollButton from './PollButton';
import '../styles/Poll.css';

function Poll(props: { question: string; options: string[] | null; respond: (response: Number) => void}) {
  return (
    <>
      <h3 className="question">{props.question}</h3>
      {props.options && props.options.map((options, index) => (
        <PollButton text={options} key={index} onClick={() => props.respond(index)}/>
      ))}
      {!props.options && ( <>
        <PollButton text="Loading..."/>
        <PollButton text="Loading..."/>
        </>
      )}
    </>
  );
}

export default Poll;
