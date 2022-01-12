import React from "react";

export default function Comments({ comment }) {
  return (
    <>
      <br />
      {comment ? (
        <div className="commentCard">
          <h3 className="commentAuthor">{comment.author}</h3>
          <p>{comment.body}</p>
          <p>Date: {comment.created_at.slice(0, 10)}</p>
        </div>
      ) : null}
    </>
  );
}
