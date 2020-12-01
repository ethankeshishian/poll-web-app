import React from 'react';
import PollButton from './PollButton';
import '../styles/Poll.css';

function Poll(props: {
  question: string;
  options: string[] | null;
  mainpoll: boolean;
}) {
  return (
    <>
      {props.mainpoll ? (
        <h3 className="question">{props.question}</h3>
      ) : (
        <h3 className="old-question">{props.question}</h3>
      )}
      {props.options &&
        props.options.map((options, index) => (
          <PollButton question={options} key={index} />
        ))}
      {!props.options && (
        <>
          <PollButton question="Loading..." />
          <PollButton question="Loading..." />
        </>
      )}
    </>
  );
}

export default Poll;
