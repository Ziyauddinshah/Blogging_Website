const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const token = require("../jwt-token/jwt-token");

router.get("/get-all", postController.getAll);
router.post("/add", token.verifyToken, postController.addPost);
router.put("/edit", token.verifyToken, postController.editPost);
router.delete("/delete", token.verifyToken, postController.deletePost);
router.get("/get", token.verifyToken, postController.getPostById);
router.get("/user", token.verifyToken, postController.getAllPostByUserId);
router.get(
  "/likes",
  token.verifyToken,
  postController.getAllLikesOfPostByPostId
);
router.post(
  "/add-like",
  token.verifyToken,
  postController.addLikesOfPostByPostId
);
router.post(
  "/remove-like",
  token.verifyToken,
  postController.removeLikesOfPostByPostId
);
router.post(
  "/add-dislike",
  token.verifyToken,
  postController.addDisLikesOfPostByPostId
);
router.post(
  "/remove-dislike",
  token.verifyToken,
  postController.removeDisLikesOfPostByPostId
);

module.exports = router;
