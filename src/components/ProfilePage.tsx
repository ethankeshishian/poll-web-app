import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SmallButtonDefault from './SmallButtonDefault';
import '../styles/ProfilePage.css';
import '../styles/global.css';
import PollContainer from './PollContainer';
import CommentSection from './CommentSection';

import { connect } from 'react-redux';
import { Actions } from '../reducer';

function ProfilePage(props: any) {
  //replace with name from backend
  const getName = (name: string) => {
    return <span className="profile-user-name bold">{name}</span>;
  };

  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const [calendarDate, setCalendarDate]: any = useState(
    new Date().toLocaleDateString('en-US', options)
  );

  const handleCalendarClick = (e: any) => {
    setCalendarDate(e.toLocaleDateString('en-US', options));
  };

  return (
    <div className="profile-page">
      <div className="profile-heading">
        <h1 className="bold">
          Welcome, {getName(props.user ? props.user[4].Value : 'Loading...')}!
        </h1>
        <SmallButtonDefault onClick={props.logout}>Log out</SmallButtonDefault>
      </div>
      <div className="profile-subheading-container">
        <h2 className="profile-subheading heavy">Your Past Polls</h2>
      </div>
      <div className="profile-details-container">
        <div className="profile-graph-container">
          <Calendar
            onChange={(e) => handleCalendarClick(e)}
            className=".profile-graph"
            maxDate={new Date()}
            calendarType="US" // Week starts on Sunday instead of Monday
          />
        </div>
        <div>
          <PollContainer
            poll={props.poll}
            mainpoll={false}
            date={calendarDate}
            respond={props.respond}
          />
          <CommentSection
            respond={null}
            comments={props.poll.comments}
            addcomment={false}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    poll: state.Polls.get('poll'),
    user: state.Account.get('user'),
    error: state.Account.get('error'),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    respond: (pollId: String, responseId: Number) => {
      Actions.poll.respond(dispatch, pollId, responseId);
    },
    logout: () => {
      Actions.account.logout(dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
