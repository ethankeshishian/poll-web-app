import React from 'react';
import Comment from './Comment';
import '../styles/CommentSection.css';

function CommentSection(props: { comments: any; addcomment: boolean }) {
  return (
    <div className="comments-section">
      <h2 className="comments-section-heading">Comments</h2>
      <div className="comments-container">
        {props.addcomment && (
          <form>
            <label>
              <textarea
                className="comments-text-box"
                name="comment"
                placeholder="Have something to say? Write your comment here!"
              />
            </label>
            <button className="comments-submit">Submit</button>
          </form>
        )}
        {props.comments &&
          props.comments.map((comment: any, index: number) => (
            <div>
              <canvas className="comment-separator" />
              <Comment
                key={index}
                username={comment.username}
                comment={comment.comment}
              />
            </div>
          ))}
        {!props.comments && <h3>Loading...</h3>}
      </div>
    </div>
  );
}

export default CommentSection;
