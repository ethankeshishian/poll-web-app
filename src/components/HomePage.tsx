import React from 'react';
import CommentSection from './CommentSection';
import PollContainer from './PollContainer';
import '../styles/HomePage.css';

import { connect } from 'react-redux';
import { Actions } from '../reducer';

function HomePage(props: any) {
  return (
    <div className="home-page">
      <PollContainer poll={props.poll} respond={props.respond} mainpoll={true} />
      <CommentSection comments={props.poll.comments} addcomment={true} />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    poll: state.Polls.get('poll'),
    user: state.Login.get('user'),
    error: state.Login.get('error')
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    respond: (responseId: Number) => {
      Actions.poll.respond(dispatch, responseId);
    },
    oauth: () => {
      Actions.login.OAuth();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
