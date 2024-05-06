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

const addComment = (postid, comment_text) => {
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

const editCommentService = (comment_id, post_id, user_id, comment_text) => {
  let config = {
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt_token"),
    },
  };
  return axios.put(
    `http://localhost:3005/comments/edit?comment_uuid=${comment_id}`,
    { comment_text: comment_text, post_id: post_id, user_id: user_id },
    config
  );
};
const deletePost = (postid) => {
  return axios.delete(`http://localhost:3001/deletepost/${postid}`);
};

export { addPost, editPost, addComment, editCommentService, deletePost };
