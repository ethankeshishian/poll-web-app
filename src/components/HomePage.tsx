import React from 'react';
import CommentSection from './CommentSection';
import PollContainer from './PollContainer';
import '../styles/HomePage.css';

import { connect } from 'react-redux';
import { Actions } from '../reducer';

function HomePage(props: any) {
  return (
    <div className="home-page">
      <PollContainer poll={props.poll} respond={props.user ? props.respond : props.oauth} mainpoll={true} />
      <CommentSection comments={props.poll.comments} addcomment={props.user} />
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
    respond: (responseId: Number) => {
      Actions.poll.respond(dispatch, responseId);
    },
    oauth: () => {
      Actions.account.OAuth();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
