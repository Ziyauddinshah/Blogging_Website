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

module.exports = router;
