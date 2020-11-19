import React from 'react';
import '../styles/Comment.css';

function Comment() {
  return (
    <div className="comment">
      <h3 className="comment-username">Username</h3>
      <p className="comment-text">
        Comment! This is a very long comment and might have to have its text
        wrap around.
      </p>
    </div>
  );
}

export default Comment;
