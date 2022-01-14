import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchCommentByReview,
  fetchReviewById,
  postComment,
} from "../utils/api";
import Comments from "./Comments";

export default function ReviewPage({ isLoggedIn, userData }) {
  const [reviewInfo, setReviewInfo] = useState([]);
  const [comments, setComments] = useState([]);
  const [bodyInput, setBodyInput] = useState("");
  const [refreshComments, setRefreshComments] = useState(false);

  const { review_id } = useParams();

  useEffect(() => {
    fetchReviewById(review_id).then((reviewFromAPI) => {
      setReviewInfo(reviewFromAPI.review);
    });
  }, []);
  useEffect(() => {
    fetchCommentByReview(review_id).then((commentsFromAPI) => {
      setComments(commentsFromAPI);
      setRefreshComments(false);
    });
  }, [refreshComments]); // this is potentially infinte looping

  const handleBodyInput = (event) => {
    setBodyInput(event.target.value);
  };
  const handlePostComment = (event) => {
    event.preventDefault();
    setRefreshComments(true);
    const newComment = {
      username: userData.username,
      body: bodyInput,
    };
    postComment(review_id, newComment);
  };

  return (
    <div className="reviewPage">
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <div className="singleReview">
        <h3>{`${reviewInfo.title}`}</h3>
        <p>
          <b>Author: </b>
          {reviewInfo.owner}
        </p>
        <p>{`${reviewInfo.review_body}`}</p>
        <img
          className="reviewImg"
          src={reviewInfo.review_img_url}
          alt="board game"
        />
        <p>
          <b>Votes: </b> {reviewInfo.votes} <b>Category: </b>{" "}
          {reviewInfo.category
            ? reviewInfo.category.replaceAll("-", " ")
            : null}{" "}
          <b>Date: </b> {/*CAN REMOVE AFTER LOADING PUT IN*/}
          {reviewInfo.created_at
            ? reviewInfo.created_at.slice(0, 10)
            : null}{" "}
          {/*CAN REMOVE AFTER LOADING PUT IN*/}
        </p>
        <p>
          <b>Comments: </b>
          {reviewInfo.comment_count}
        </p>
        {isLoggedIn ? (
          <form className="postCommentForm" onSubmit={handlePostComment}>
            <p>Post a comment!</p>
            <input
              className="commentBodyForm"
              type="text"
              placeholder="Comment"
              value={bodyInput}
              onChange={handleBodyInput}
            ></input>
            <br />
            <button type="submit">Post Comment</button>
          </form>
        ) : (
          <p>Login to post a comment</p>
        )}

        <div>
          {comments.length
            ? comments.map((comment) => {
                return (
                  <Comments
                    comment={comment}
                    userData={userData}
                    isLoggedIn={isLoggedIn}
                    setRefreshComments={setRefreshComments}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
