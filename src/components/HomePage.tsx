import React from 'react';
import CommentSection from './CommentSection';
import PollContainer from './PollContainer';
import '../styles/HomePage.css';

function HomePage(props: any) {
  return (
    <div className="home-page">
      <PollContainer poll={props.poll} respond={props.respond} mainpoll={true} />
      <CommentSection comments={props.poll.comments} addcomment={true} />
    </div>
  );
}

export default HomePage;
