import React, { useEffect } from 'react';
import SmallButtonDefault from './SmallButtonDefault';
import '../styles/ProfilePage.css';
import '../styles/global.css';
import PollContainer from './PollContainer';
import CommentSection from './CommentSection';

import { connect } from 'react-redux';
import { Actions } from '../reducer';

function ProfilePage(props: any) {

  //replace with name from backend
  const profile: { firstname: string } = { firstname: 'Julia' };
  const getName = (name: string) => {
    return <span className="profile-user-name bold">{name}</span>;
  };

  const poll: { date: string } = { date: 'November 23, 2020' };

  return (
    <div className="profile-page">
      <div className="profile-heading">
        <h1 className="bold">Welcome, {getName(profile.firstname)}!</h1>
        <SmallButtonDefault onClick={props.logout} text="Log out" />
      </div>
      <div className="profile-subheading-container">
        <h2 className="profile-subheading heavy">Your Past Polls</h2>
      </div>
      <div className="profile-details-container">
        <div className="profile-graph-container">
          <p>
            calendar displaying currrent month with answered poll dates
            highlighted/colored in, user can click on specific dates to see that
            date’s poll, results, and comments
          </p>
        </div>
        <div>
          <PollContainer poll={props.poll} mainpoll={false} date={poll.date} respond={props.respond} />
          <CommentSection respond={null} comments={props.poll.comments} addcomment={false} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    poll: state.Polls.get('poll'),
    user: state.Account.get('user'),
    error: state.Account.get('error')
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    respond: (pollId: String, responseId: Number) => {
      Actions.poll.respond(dispatch, pollId, responseId);
    },
    logout: () => {
      Actions.account.logout(dispatch);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
