import React from 'react';
import Comment from './Comment';
import '../styles/CommentSection.css';

function CommentSection() {
  return (
    <div className="comments-section">
      <h2 className="comments-section-heading">Comments</h2>
      <div className="comments-container">
        <Comment />
        {/* Note on canvas: When using row-gap or <hr />, size is inconsistent. 
        This seems to work. */}
        <canvas className="comment-separator" />
        <Comment />
        <canvas className="comment-separator"></canvas>
        <Comment />
      </div>
    </div>
  );
}

export default CommentSection;
