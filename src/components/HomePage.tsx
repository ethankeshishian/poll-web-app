import React from "react";
import CommentSection from "./CommentSection";
import PollContainer from "./PollContainer";
import "../styles/HomePage.css";

import { connect } from "react-redux";
import { Actions } from "../reducer";

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
      <CommentSection respond={props.comment} pollId={props.poll.id} comments={props.poll.comments} addcomment={props.user} />
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
    comment: (comment : string, pollId: string) => {
      Actions.poll.comment(dispatch, comment, pollId);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
