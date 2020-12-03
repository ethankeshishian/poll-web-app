import React, { useState } from 'react';
import Comment from './Comment';
import '../styles/CommentSection.css';

function CommentSection(props: { respond : any, comments: any; addcomment: boolean }) {

  const [comment, setComment] = useState("");

  return (
    <div className="comments-section">
      <h2 className="comments-section-heading">Comments</h2>
      <div className="comments-container">
        {props.addcomment && (
          <div>
            <label>
              <textarea
                className="comments-text-box"
                name="comment"
                placeholder="Have something to say? Write your comment here!"
                value={comment}
                onChange={(event : any) => setComment(event.target.value)}
              />
            </label>
            <button onClick={() => {
              if (comment) {
                props.respond(comment);
                setComment("");
              }
            }} className="comments-submit">Submit</button>
          </div>
        )}
        {props.comments &&
          props.comments.map((comment: any, index: number) => (
            <div key={index}>
              <canvas className="comment-separator" />
              <Comment
                // username={comment.username}
                comment={comment.commentText}
              />
            </div>
          ))}
        {!props.comments && <h3>Loading...</h3>}
      </div>
    </div>
  );
}

export default CommentSection;
