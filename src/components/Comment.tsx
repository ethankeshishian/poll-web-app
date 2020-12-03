import React from 'react';
import '../styles/Comment.css';
import '../styles/global.css';

function Comment(props : any) {
  return (
    <div className="comment">
      {/* <h3 className="bold comment-username">{ props.username || "Loading..." }</h3> */}
      <p className="comment-text">
        {props.comment || "Loading..."}
      </p>
    </div>
  );
}

export default Comment;
