import axios from "axios";

const addPost = (createpost, username) => {
  let config = {
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt_token"),
    },
  };
  return axios.post("http://localhost:3005/posts/add", config, {
    post: createpost,
    username: username,
  });
};

const editPost = (post_uuid, post_text) => {
  let config = {
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt_token"),
    },
  };
  return axios.put(
    `http://localhost:3005/posts/edit?post_uuid=${post_uuid}`,
    {
      post_text: post_text,
    },
    config
  );
};

const addCommentService = (postid, comment_text) => {
  let config = {
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt_token"),
    },
  };
  return axios.post(
    "http://localhost:3005/comments/add",
    {
      post_uuid: postid,
      comment_text: comment_text,
    },
    config
  );
};

const editCommentService = (comment_id, user_id, comment_text) => {
  let config = {
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt_token"),
    },
  };
  return axios.put(
    `http://localhost:3005/comments/edit?comment_uuid=${comment_id}`,
    { comment_text: comment_text },
    config
  );
};

const deleteCommentService = (comment_uuid, jwt_token) => {
  let config = {
    headers: {
      authorization: "Bearer " + jwt_token,
    },
  };
  return axios.delete(
    `http://localhost:3005/comments/delete?comment_uuid=${comment_uuid}`,
    config
  );
};

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

const disLikesOfPostService = (post_id, jwt_token) => {
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

export {
  addPost,
  editPost,
  addCommentService,
  editCommentService,
  deleteCommentService,
  getLikePostService,
  addLikesOfPostService,
  disLikesOfPostService,
};
