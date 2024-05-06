const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const token = require("../jwt-token/jwt-token");

router.get("/get-all", commentController.getAll);
router.post("/add", token.verifyToken, commentController.addComment);
router.put("/edit", token.verifyToken, commentController.editComment);
router.delete("/delete", token.verifyToken, commentController.deleteComment);
router.get("/get", commentController.getAllCommentsByPostId);
module.exports = router;
