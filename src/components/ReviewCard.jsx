import React from "react";
import { Link } from "react-router-dom";

export default function ReviewCard({ review }) {
  return (
    <>
      <div className="reviewCard">
        <h3>{`${review.title}`}</h3>
        <p>Author: {review.owner}</p>
        <p>{`${review.review_body}`}</p>
        <img className="reviewImg" src={review.review_img_url} />
        <p>
          <b>Votes: </b> {review.votes} <b>Category: </b>{" "}
          {review.category.replaceAll("-", " ")} <b>Date: </b>{" "}
          {review.created_at.slice(0, 10)}
        </p>
        <p><b>Comments: </b>{review.comment_count}</p>
        <nav>
            <Link to={`/reviews/${review.review_id}`}>View</Link>
        </nav>
      </div>
      <br />
    </>
  );
}
