const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const token = require("../jwt-token/jwt-token");

router.get("/get-all", token.verifyToken, userController.getAll);
router.get("/get-one", token.verifyToken, userController.getOneUser);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.put("/edit", token.verifyToken, userController.editUser);
router.delete("/delete", token.verifyToken, userController.deleteUser);
router.post(
  "/forgot-password",
  token.verifyToken,
  userController.forgotPassword
);
router.get("/verify-email", userController.verifyEmail);
router.get(
  "/id_from_token",
  token.verifyToken,
  userController.getUserIdFromToken
);

module.exports = router;
