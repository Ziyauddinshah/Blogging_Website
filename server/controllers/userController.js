const sql = require("../database/db");
const transporter = require("../email-notification/notificationConfig");
const token = require("../jwt-token/jwt-token");
const bcrypt = require("bcryptjs");

async function getAll(req, res, next) {
  try {
    const query = "SELECT * from users order by id asc";
    sql.query(query, [], (error, result) => {
      if (error) {
        return res.status(400).send({
          message: "Something went wrong in getAll users, syntax error",
        });
      } else {
        if (result.length < 1) {
          res.status(401).json({ message: "No user available" });
        } else {
          res.status(200).json({ result: result });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in getAll users" });
  }
}

async function getOneUser(req, res, next) {
  try {
    const uuid = req.query.user_uuid;
    const query = "SELECT * from users where uuid=? order by id asc";
    sql.query(query, [uuid], (error, result) => {
      if (error) {
        // console.error("error in getOneUser: ", error);
        return res.status(400).send({
          message: "Something went wrong in getOneUser, syntax error",
        });
      } else {
        if (result.length < 1) {
          // console.log("result: ", result);
          res.status(401).json({ message: "no user found with given id" });
        } else {
          // console.log("result: ", result);
          res.status(200).json({ message: result });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in getOneUser" });
  }
}

async function login(req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const query = "select * from users where email=?";
    sql.query(query, [email], (error, result) => {
      if (error) {
        return res.status(400).send({
          message: "Something went wrong! in login error, syntax error",
        });
      } else {
        if (result.length < 1) {
          // console.log("user with given email does not exist");
          return res.status(202).json({
            message: "user with given email does not exist",
          });
        } else {
          const user_uuid = result[0].user_uuid;
          const user_firstname = result[0].firstname;
          const user_email = result[0].email;
          const user_password = result[0].password;
          // Compare hashed password
          bcrypt.compare(password, user_password, (error2, isMatched) => {
            if (!isMatched || error2) {
              // console.log("error in login, invalid username or password");
              return res
                .status(202)
                .json({ message: "Invalid username or password" });
            } else {
              const jwt_Token = token.generateJwtToken(
                user_uuid,
                user_email,
                user_firstname
              );
              res.status(200).json({
                message: "login successfully",
                firstname: user_firstname,
                jwt_Token: jwt_Token,
              });
            }
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error in user login" });
  }
}

async function register(req, res, next) {
  const firstname = req.body.firstname;
  const email = req.body.email;
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const query1 = `select * from users where email='${email}'`;
    const query2 =
      "insert into users(uuid,firstname,email,password) values(f_new_uuid(),?,?,?)";
    sql.query(query1, [], (error1, result1) => {
      if (error1) {
        // console.log("error1 in register: ", error1);
        return res
          .status(400)
          .send({ message: "Something went wrong in register, syntax error" });
      } else {
        if (result1.length > 0) {
          // console.log("user already present in db, can't add duplicate user");
          res.status(202).send({
            message: "User already present in db, can't add duplicate user",
          });
        } else {
          sql.query(
            query2,
            [firstname, email, encryptedPassword],
            (error2, result2) => {
              if (error2) {
                // console.log("error2 in register: ", error2);
                return res.status(202).send({
                  message: "Something went wrong in register, syntax error",
                });
              } else {
                // sendEmailForUserVerification(firstname, email);
                res
                  .status(200)
                  .json({ message: "New user inserted successfully..." });
              }
            }
          );
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error in user register" });
  }
}

async function editUser(req, res, next) {
  try {
    const user_uuid = req.query.user_uuid;
    const user_name = req.body.user_name;
    const user_email = req.body.user_email;
    const query1 = "select * from users where uuid=?";
    const query2 = "update users set firstname=?, email=? where uuid=?";
    sql.query(query1, [user_uuid], (error1, result1) => {
      if (error1) {
        // console.log("error1 in editUser: ", error1);
        return res.status(400).send({
          message: "Something went wrong in deleteUser, syntax error",
        });
      } else {
        if (result1.length < 1) {
          // console.log("result: ", result1);
          res.status(401).json({ message: "no user found with given uuid" });
        } else {
          sql.query(
            query2,
            [user_name, user_email, user_uuid],
            (error2, result2) => {
              if (error2) {
                // console.log("error2 in editUser: ", error2);
                return res.status(400).send({
                  message: "Something went wrong in editUser, syntax error",
                });
              } else {
                // console.log("result: ", result.message);
                res.status(200).json({ message: "user edited successfully" });
              }
            }
          );
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in editUser" });
  }
}

async function deleteUser(req, res, next) {
  try {
    const user_uuid = req.query.user_uuid;
    const query1 = "select * from users where uuid=?";
    const query2 = "delete from users where uuid=?";
    sql.query(query1, [user_uuid], (error1, result1) => {
      if (error1) {
        // console.log("error1 in deleteUser: ", error1);
        return res.status(400).send({
          message: "Something went wrong in deleteUser, syntax error",
        });
      } else {
        if (result1.length < 1) {
          // console.log("result: ", result1);
          res.status(401).json({ message: "no user found with given uuid" });
        } else {
          sql.query(query2, [user_uuid], (error2, result2) => {
            if (error2) {
              // console.log("error2 in deleteUser: ", error2);
              return res.status(400).send({
                message: "Something went wrong in deleteUser, syntax error",
              });
            } else {
              // console.log("result: ", result2);
              res.status(200).json({ message: "user deleted successfully" });
            }
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in deleteUser" });
  }
}

async function forgotPassword(req, res, next) {
  try {
    const email = req.body.email;
    const query = `Select * from users where email = '${email}'`;
    sql.query(query, [], (error, result) => {
      if (error) {
        // console.log("error in forgot password: ", error);
        return res.status(400).send({
          message: "Something went wrong in forgotPassword, syntax error",
        });
      } else {
        if (result.length > 0) {
          // console.log("result: ", result);
          const password = result[0].password;
          const message = sendPasswordToEmail(email, password);
          if (message.status !== null) {
            res
              .status(200)
              .json({ message: "Password sent to registered email" });
          } else {
            res.status(403).json({ message: "can`t email password" });
          }
        } else {
          res
            .status(401)
            .json({ message: "Wrong email or user does not exist" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in forgotPassword" });
  }
}

async function verifyEmail(req, res) {
  const htmlContent = `
    <h1>Hello from Node.js server!</h1>
    <p style="color: green; font-size: 25px;">Email Verified Successfully </p>
  `;
  var email = req.query.email;
  const query = `update users set is_verified = ${1} where email = ?`;
  sql.query(query, [email], (error, result) => {
    if (error) {
      console.log("error in verify email: ", error);
    } else {
      // console.log("Email Verified Successfully");
      res.setHeader("Content-Type", "text/html");
      res.send(htmlContent);
    }
  });
}

async function sendEmailForUserVerification(name, email) {
  const htmlContent = `
    <h4>Hello, ${name}</h4>
    <p>This is an HTML email sent using Node.js and nodemailer!</p>
    <p>Click on the link below to verify email: </p>
    <a href="http://localhost:3005/users/verify-email?email=${email}">Verify</a>
  `;
  // Send an example email
  const mailOptions = {
    from: "ziyauddin270499@gmail.com",
    to: email,
    subject: "User Verification Email",
    html: htmlContent,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
  const data = {
    status: true,
  };
  return data;
}

async function sendPasswordToEmail(email, password) {
  const data = {
    status: false,
  };
  try {
    const htmlContent = `
    <h5>Hello,</h5>
    <p>Your EmailId is: ${email} </p>
    <p>Your Password is: ${password} </p>
  `;
    // Send an example email
    const mailOptions = {
      from: "ziyauddin270499@gmail.com",
      to: email,
      subject: "Forgot Password Email",
      html: htmlContent,
    };
    let info = await transporter.sendMail(mailOptions);
    // console.log("Email sent: ", info.messageId);
    data.status = info.messageId;
    return data;
  } catch (error) {
    console.log("Error fetching in sendPasswordToEmail");
  }
}

async function getUserIdFromToken(req, res, next) {
  const user_id = res.locals.user_uuid;
  if (user_id) res.status(200).send({ user_id: user_id });
  else res.status(202).send({ message: "login again" });
}

module.exports = {
  getAll,
  getOneUser,
  login,
  register,
  editUser,
  deleteUser,
  forgotPassword,
  verifyEmail,
  getUserIdFromToken,
};
