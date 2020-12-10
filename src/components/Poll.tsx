import React, { useState } from 'react';
import PollButton from './PollButton';
import '../styles/Poll.css';

function Poll(props: {
  question: string;
  options: string[] | null;
  mainpoll: boolean;
  respond: (response: Number) => void;
  votes: number[];
  usersVote: number;
  isOld: boolean;
}) {
  const hasVoted = props.usersVote === null ? false : true;
  const totalVotes: number = props.votes
    ? props.votes.reduce((a: number, b: number) => a + b, 0)
    : 0;
  const [animateFrom0, setAnimateFrom0] = useState(true);
  const [animateNext, setAnimateNext] = useState(true);
  // const [voteobj, setVoteobj] = useState({ votes: [1, 1], totalVotes: 2 });
  // const handleClick = () => {
  //   setVoteobj({
  //     votes: [voteobj.votes[0] + 1, voteobj.votes[1]],
  //     totalVotes: voteobj.totalVotes + 1,
  //   });
  //   console.log(voteobj.votes, voteobj.totalVotes);
  // };
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
            votedThis={
              props.usersVote === null
                ? false
                : props.usersVote === index
                ? true
                : false
            }
            hasVoted={hasVoted}
            animateFrom0={animateFrom0}
            animateNext={animateNext}
            setAnimateFrom0={setAnimateFrom0}
            setAnimateNext={setAnimateNext}
            isOld={props.isOld}
          />
        ))}
      {!props.options && (
        <>
          <PollButton
            question="Loading..."
            vote={0}
            voteTotal={totalVotes}
            hasVoted={false}
            animateFrom0={animateFrom0}
            votedThis={false}
            animateNext={animateNext}
            setAnimateFrom0={setAnimateFrom0}
            setAnimateNext={setAnimateNext}
            isOld={props.isOld}
          />
          <PollButton
            question="Loading..."
            vote={0}
            voteTotal={totalVotes}
            hasVoted={false}
            animateFrom0={false}
            votedThis={false}
            animateNext={animateNext}
            setAnimateFrom0={setAnimateFrom0}
            setAnimateNext={setAnimateNext}
            isOld={props.isOld}
          />
        </>
      )}
    </>
  );
}

export default Poll;
