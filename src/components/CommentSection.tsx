import React from 'react';
import Comment from './Comment';
import '../styles/CommentSection.css';

function CommentSection(props : any) {

    return (
      <div className="comments-section">
        <h2 className="comments-section-heading">Comments</h2>
        <div className="comments-container">
          {/* ADD "ADD COMMENT" SECTION */}
          {props.comments && props.comments.map((comment : any, index : number) => 
              <div>
                <canvas className="comment-separator" />
                <Comment key={index} username={comment.username} comment={comment.comment}/>
              </div>
          )}
          {!props.comments && 
            <h3>Loading...</h3>
          }
        </div>
      </div>
    );

}

export default CommentSection;
