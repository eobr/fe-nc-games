import React, { useState } from "react";
import { deleteComment } from "../utils/api";

export default function Comments({ comment, userData, isLoggedIn }) {
  let loggedInUser = false;
  if (comment.author === userData.username) loggedInUser = true;
  else loggedInUser = false;

  const handleDeleteComment = (event) => {
    event.preventDefault();
    deleteComment(comment.comment_id);
  };

  return (
    <>
      <br />
      {comment ? (
          <div className="commentCard">
            <h3 className="commentAuthor">{comment.author}</h3>
            {loggedInUser ? (
              isLoggedIn ? (
                <button
                  className="deleteCommentButton"
                  onClick={handleDeleteComment}
                >
                  Delete
                </button>
              ) : null
            ) : null}
            <p>{comment.body}</p>
            <p>Date: {comment.created_at.slice(0, 10)}</p>
          </div>
        
      ) : null}
    </>
  );
}
