import React from 'react';
import PollButton from './PollButton';
import '../styles/Poll.css';

function Poll(props: {
  question: string;
  options: string[] | null;
  mainpoll: boolean;
  respond: (response: Number) => void;
  votes: number[];
  usersVote: number;
}) {
  const totalVotes: number = props.votes
    ? props.votes.reduce((a: number, b: number) => a + b, 0)
    : 0;
  return (
    <>
      {props.mainpoll ? (
        <h3 className="question">{props.question}</h3>
      ) : (
        <h3 className="old-question">{props.question}</h3>
      )}
      {props.options &&
        props.options.map((options, index) => (
          <PollButton
            question={options}
            key={index}
            onClick={() => props.respond(index)}
            vote={props.votes[index]}
            voteTotal={totalVotes}
            hasVoted={
              props.usersVote === null
                ? false
                : props.usersVote === index
                ? true
                : false
            }
          />
        ))}
      {!props.options && (
        <>
          <PollButton
            question="Loading..."
            vote={0}
            voteTotal={totalVotes}
            hasVoted={false}
          />
          <PollButton
            question="Loading..."
            vote={0}
            voteTotal={totalVotes}
            hasVoted={false}
          />
        </>
      )}
    </>
  );
}

export default Poll;
