import axios from "axios";

const getLikePostService = (post_id, jwt_token) => {
  let config = {
    headers: {
      authorization: "Bearer " + jwt_token,
    },
  };
  return axios.get(
    `http://localhost:3005/posts/likes?post_id=${post_id}`,
    config
  );
};

const addLikesOfPostService = (post_id, jwt_token) => {
  let config = {
    headers: {
      authorization: "Bearer " + jwt_token,
    },
  };
  return axios.post(
    `http://localhost:3005/posts/add-like?post_id=${post_id}`,
    config
  );
};

const removeLikesOfPostService = (post_id, jwt_token) => {
  let config = {
    headers: {
      authorization: "Bearer " + jwt_token,
    },
  };
  return axios.post(
    `http://localhost:3005/posts/remove-like?post_id=${post_id}`,
    config
  );
};

const addDisLikesOfPostService = (post_id, jwt_token) => {
  let config = {
    headers: {
      authorization: "Bearer " + jwt_token,
    },
  };
  return axios.post(
    `http://localhost:3005/posts/add-dislike?post_id=${post_id}`,
    config
  );
};

const removeDisLikesOfPostService = (post_id, jwt_token) => {
  let config = {
    headers: {
      authorization: "Bearer " + jwt_token,
    },
  };
  return axios.post(
    `http://localhost:3005/posts/remove-dislike?post_id=${post_id}`,
    config
  );
};

export {
  getLikePostService,
  addLikesOfPostService,
  removeLikesOfPostService,
  addDisLikesOfPostService,
  removeDisLikesOfPostService,
};
