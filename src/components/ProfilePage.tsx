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
  console.log(props.key);
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
    new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString('en-US', options)
  );

  const [UTCDate, setUTCDate]: any = useState(
    new Date(new Date().setUTCDate(new Date().getUTCDate() - 2)).setUTCHours(0, 0, 0, 0)
  );

  const handleCalendarClick = (e: any) => {
    setCalendarDate(e.toLocaleDateString('en-US', options));
    setUTCDate(new Date(e).setUTCHours(0, 0, 0, 0));
  };

  return (
    <div className="profile-page">
      <div className="profile-heading">
        <h1 className="profile-welcome">
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
            maxDate={new Date(new Date().setDate(new Date().getDate() - 1))}
            calendarType="US" // Week starts on Sunday instead of Monday
            defaultValue={new Date(new Date().setDate(new Date().getDate() - 1))}
          />
        </div>
        <div>
          {props.allPolls[UTCDate] && (
            <>
              <PollContainer
                poll={props.allPolls[UTCDate]}
                mainpoll={false}
                date={calendarDate}
                respond={props.respond}
                previous={true}
                usersVote={
                  props.allPolls[UTCDate].results.responses[props.username]
                    ? props.allPolls[UTCDate].results.responses[props.username]
                        .response
                    : null
                }
                isOld={true}
              />
              <CommentSection
                respond={null}
                comments={props.allPolls[UTCDate].comments}
                addcomment={false}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    poll: state.Polls.get('poll'),
    allPolls: state.Polls.get('all'),
    user: state.Account.get('user'),
    error: state.Account.get('error'),
    username: state.Account.get('key').username,
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
