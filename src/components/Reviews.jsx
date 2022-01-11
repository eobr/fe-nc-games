import React, { useEffect, useState } from "react";
import { fetchCategories, fetchReviews } from "../utils/api";
import ReviewCard from "./ReviewCard";

export default function Reviews() {
  /*
    no filter state - get.reviews
    filter category query
    sortby sortby query
    order query
    use states for this?
    */

  const [order, setOrder] = useState(undefined);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [sortBy, setSortBy] = useState(undefined);
  const [reviewsList, setReviewsList] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [submit, setSubmit] = useState(false);

  const handleOrder = (event) => {
    if (event.target.value)
    setOrder(event.target.value)
    else setOrder(undefined)
  };
  const handleSortBy = (event) => {
    if (event.target.value)
    setSortBy(event.target.value)
    else setSortBy(undefined)
  };
  const handleCategory = (event) => {
    if (event.target.value)
    setSelectedCategory(event.target.value)
    else setSelectedCategory(undefined)
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchReviews(sortBy, selectedCategory, order).then((data) => {
      console.log(data);
      setReviewsList(data);
    });
  };

  useEffect(() => {
    fetchCategories().then((data) => {
      setAllCategories(data);
    });
  }, []);

  useEffect(() => {
    fetchReviews().then((data) => {
      setReviewsList(data);
    });
  }, []);

  return (
    <div className="reviews">
      <form className="filter" onSubmit={handleSubmit}>
        <label>
          Sort by:{" "}
          <select value={sortBy} onChange={handleSortBy}>
            <option value="">Default</option>
            <option value="votes">Votes</option>
            <option value="created_at">Date</option>
            <option value="category">Category</option>
            <option value="owner">Author</option>
            <option value="comment_count">Comment count</option>
          </select>
        </label>
        <label>
          {" "}
          Order:{" "}
          <select value={order} onChange={handleOrder}>
            <option value="">Default</option>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </label>
        <label>
          {" "}
          Category:{" "}
          <select value={selectedCategory} onChange={handleCategory}>
            <option value="">All</option>
            {allCategories.map((category) => {
              return <option value={category.slug}>{category.slug}</option>;
            })}
          </select>
        </label>
        <button type="submit">Ok</button>
      </form>
      <div>
        {reviewsList.map((review) => {
          return <ReviewCard review={review} />;
        })}
      </div>
    </div>
  );
}
