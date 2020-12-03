import React from "react";
import CommentSection from "./CommentSection";
import PollContainer from "./PollContainer";
import "../styles/HomePage.css";

import { connect } from "react-redux";
import { Actions } from "../reducer";
import { stat } from "fs";

function HomePage(props: any) {
  return (
    <div className="home-page">
      <PollContainer
        poll={props.poll}
        respond={props.user ? props.respond : props.oauth}
        mainpoll={true}
        response={
          props.poll.results
            ? props.poll.results.responses[props.username]
            : null
        }
      />
      <CommentSection comments={props.poll.comments} addcomment={props.user} />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    poll: state.Polls.get("poll"),
    user: state.Account.get("user"),
    username: state.Account.get("key")?.username,
    error: state.Account.get("error"),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    respond: (pollId: String, responseId: Number) => {
      Actions.poll.respond(dispatch, pollId, responseId);
    },
    oauth: () => {
      Actions.account.OAuth();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
