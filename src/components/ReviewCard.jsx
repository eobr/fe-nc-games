import React, { useState } from "react";
import { Link } from "react-router-dom";
import { likeReview, unlikeReview } from "../utils/api";
import { formatCategory } from "../utils/util-functions";

export default function ReviewCard({ review, isLoggedIn}) {
  const [liked, setLiked] = useState(false);
  const [amountLikes, setAmountLikes] = useState(review.votes);
  const handleLike = () => {
    if (isLoggedIn) {
      likeReview(review.review_id);
      setLiked(true)
      setAmountLikes((currLikes) => currLikes + 1)
    }
  };
  const handleUnlike = () => {
    if (isLoggedIn) {
      unlikeReview(review.review_id);
      setLiked(false)
      setAmountLikes((currLikes) => currLikes - 1)
    }
  };

  return (
    <>
      <div className="reviewCard">
        <h3>{`${review.title}`}</h3>
        <p>
          <b>Author: </b>
          {review.owner}
        </p>
        <p>{`${review.review_body}`}</p>
        <img className="reviewImg" src={review.review_img_url} />
        <p>
          <b>Category: </b> {formatCategory(review.category)} <b>Date: </b>{" "}
          {review.created_at.slice(0, 10)}
        </p>
        <p>
          {" "}
          <b>Likes: </b> {amountLikes}{" "}
        </p>
        {liked ? <button onClick={handleUnlike}>👎</button>: <button onClick={handleLike}>👍</button>}
        {isLoggedIn ? null : <p>Please login to vote!</p>}
        
        <p>
          <b>Comments: </b>
          {review.comment_count}{" "}
        </p>
        <nav>
          <Link to={`/reviews/${review.review_id}`}>View</Link>
        </nav>
      </div>
      <br />
    </>
  );
}
