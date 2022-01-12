import axios from "axios";

const boardGamesAPI = axios.create({
  baseURL: "https://nc-games-host-ok.herokuapp.com/api",
});

export const fetchUserByUsername = (username) => {
  return boardGamesAPI.get(`/users/${username}`).then((res) => {
    return res.data;
  });
};

export const fetchReviews = (sort_by, category, order) => {
  return boardGamesAPI
    .get(`/reviews`, { params: { sort_by, category, order } })
    .then((res) => {
      return res.data;
    });
};

export const fetchCategories = () => {
  return boardGamesAPI.get("/categories").then((res) => {
    return res.data;
  });
};

export const fetchReviewById = (review_id) => {
  return boardGamesAPI.get(`/reviews/${review_id}`).then(res => {
    return res.data;
  })
}

export const fetchCommentByReview = (review_id) => {
  return boardGamesAPI.get(`/reviews/${review_id}/comments`).then(res => {
    return res.data;
  })
}

export const postComment = (review_id, comment) => {
  return boardGamesAPI.post(`/reviews/${review_id}/comments`, comment)
}
