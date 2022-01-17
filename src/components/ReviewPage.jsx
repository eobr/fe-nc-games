import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchCommentByReview,
  fetchReviewById,
  postComment,
} from "../utils/api";
import Comments from "./Comments";

export default function ReviewPage({ isLoggedIn, userData }) {
  const [reviewInfo, setReviewInfo] = useState(undefined);
  const [comments, setComments] = useState([]);
  const [bodyInput, setBodyInput] = useState("");
  const [refreshComments, setRefreshComments] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { review_id } = useParams();

  useEffect(() => {
    fetchReviewById(review_id)
      .then((reviewFromAPI) => {
        setReviewInfo(reviewFromAPI.review);
      })
      .catch((err) => {
        setErrMsg(err.response.data);
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

  return errMsg ? (
    <h1 className="errMsg">{errMsg}</h1>
  ) : reviewInfo ? (
    <div className="reviewPage">
      <nav className="homeButton">
        <Link to="/">
          <button>Home</button>
        </Link>
      </nav>
      <div className="singleReview">
        <h3 className="singleReviewTitle">{`${reviewInfo.title}`}</h3>
        <p className="singleReviewAuthor">
          <b>Author: </b>
          {reviewInfo.owner}
        </p>
        <div className="imgAndBodyFlex">
          <p className="singleReviewBody">{`${reviewInfo.review_body}`}</p>
          <img
            className="reviewImg"
            src={reviewInfo.review_img_url}
            alt="board game"
          />
        </div>
        <p className="singleReviewBottomText">
          <p>
            <b>Votes: </b> {reviewInfo.votes}{" "}
          </p>
          <p>
            <b>Category: </b>{" "}
            {reviewInfo.category
              ? reviewInfo.category.replaceAll("-", " ")
              : null}{" "}
          </p>
          <p>
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
        </p>
      </div>
      {isLoggedIn ? (
        <form className="postCommentForm" onSubmit={handlePostComment}>
          <p>
            <b>Post a comment!</b>
          </p>
          <textarea
            name="Text1"
            cols="40"
            rows="5"
            className="commentBodyForm"
            type="text"
            placeholder="Comment"
            value={bodyInput}
            onChange={handleBodyInput}
          ></textarea>
          {/* <input
              
            ></input> */}
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
  ) : null;
}
