import React, { useState } from 'react';
import '../styles/global.css';
import '../styles/PollContainer.css';
import Poll from './Poll';

import { connect } from 'react-redux';
import { Actions } from '../reducer';
import DemographicItem from './DemographicItem';

function PollContainer(props: any) {
  // if (props.response)
  //   return (
  //     <div>
  //       You've already voted in this poll.
  //       <br />
  //       You voted: {props.response.response}
  //     </div>
  //   );

  // if (props.poll.timestamp_closed)
  //   return (
  //     <div>
  //       This poll has already ended!
  //       <br />
  //       Results: {props.poll.results.responses_total} // Vote counts: [4, 5]
  //     </div>
  //   );

  return (
    <div className="main-poll">
      {props.mainpoll ? (
        <h1 className="bold title">Today's Poll</h1>
      ) : (
        <h2 className="heavy old-title">{props.date}</h2>
      )}
      {/* CHANGE RESPONSES PROPERTIES */}
      <Poll
        question={props.poll.poll_question || 'Loading...'}
        options={props.poll.poll_responses || null}
        mainpoll={props.mainpoll}
        respond={(responseId) => {
          props.user ? props.respond(props.poll.id, responseId) : props.oauth();
        }}
        votes={props.poll.results ? props.poll.results.responses_totals : null}
        usersVote={props.usersVote}
        isOld={props.isOld}
      />
      {!props.previous && (
        <div className="poll-footer">
          {/* <h3 className="footer-title" onClick={() => {}}>
          VIEW DETAILED RESULTS
        </h3> */}
          <h3
            className="footer-title"
            onClick={() =>
              props.user ? props.showSuggestions() : props.oauth()
            }
          >
            VOTE FOR TOMORROW'S POLL
          </h3>
        </div>
      )}
      {props.poll?.results?.analytics && (
        <div className="demographics-container">
          <h3 className="demographics-title">Demographics:</h3>
          <div>
            <h4>Total results:</h4>
            Female votes:{' '}
            {props.poll.results.analytics.genders[0].Female +
              props.poll.results.analytics.genders[1].Female}{' '}
            <br />
            Male votes:{' '}
            {props.poll.results.analytics.genders[0].Male +
              props.poll.results.analytics.genders[1].Male}{' '}
            <br />
            Average age: {props.poll.results.analytics.average_age_total} <br />
          </div>
          <div>
            <h4>Question-specific results:</h4>
            <h5>{props.poll.poll_responses[0]}:</h5>
            <DemographicItem
              firstAmount={props.poll.results.analytics.genders[0].Female}
              secondAmount={props.poll.results.analytics.genders[0].Male}
              thirdAmount={props.poll.results.analytics.genders[0].Other}
              text={props.poll.poll_responses[0]}
            />
            Average Age: {props.poll.results.analytics.average_age[0]} <br />
            Female votes: {props.poll.results.analytics.genders[0].Female}
            <br />
            Male votes: {props.poll.results.analytics.genders[0].Male}
            <br />
            Other votes: {props.poll.results.analytics.genders[0].Other} <br />
            <h5>{props.poll.poll_responses[1]}:</h5>
            <DemographicItem
              firstAmount={props.poll.results.analytics.genders[1].Female}
              secondAmount={props.poll.results.analytics.genders[1].Male}
              thirdAmount={props.poll.results.analytics.genders[1].Other}
              text={props.poll.poll_responses[1]}
            />
            Average Age: {props.poll.results.analytics.average_age[1]} <br />
            Female votes: {props.poll.results.analytics.genders[1].Female}
            <br />
            Male votes: {props.poll.results.analytics.genders[1].Male}
            <br />
            Other votes: {props.poll.results.analytics.genders[1].Other} <br />
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.Account.get('user'),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    oauth: () => {
      Actions.account.OAuth();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PollContainer);
