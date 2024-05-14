const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var secretKey = "jwt-token-key";

const generateJwtToken = (user_uuid, email, firstname) => {
  const user_data = {
    name: "Jwt-Token",
    uuid: user_uuid,
    email: email.toLowerCase(),
    firstname: firstname,
  };

  // Create token
  const token = jwt.sign(user_data, secretKey, { expiresIn: "2d" });
  return token;
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(202).send("Access denied. No token provided");
    }
    const tokenToVerify = token;
    jwt.verify(tokenToVerify, secretKey, (error, decoded) => {
      if (error) {
        // console.error("Jwt token has expired:", error);
        return res.status(202).send({ message: "Token expired" });
      } else {
        // console.log("Jwt token verified successfully");
        res.locals.user_uuid = decoded.uuid;
        next();
      }
    });
  } catch (ex) {
    console.log("error ", ex);
    return res.status(400).send({ message: "Invalid token, login again" });
  }
};

module.exports = { generateJwtToken, verifyToken };
