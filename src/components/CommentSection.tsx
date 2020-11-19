import React from 'react';
import Comment from './Comment';
import '../styles/CommentSection.css';

function CommentSection() {
  return (
    <div className="comments-section">
      <h2 className="comments-section-heading">Comments</h2>
      <div className="comments-container">
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  );
}

export default CommentSection;
