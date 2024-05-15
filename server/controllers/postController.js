const sql = require("../database/db");

async function getAll(req, res, next) {
  try {
    const query = "select * from posts order by id desc";
    sql.query(query, [], (error, result) => {
      if (error) {
        // console.log("error in getAll posts: ", error);
        return res.status(400).send({
          message: "Something went wrong in getAll posts, syntax error",
        });
      } else {
        if (result.length < 1) {
          // console.log("result: ", result);
          res.status(200).json({ message: "no post available" });
        } else {
          // console.log("result: ", result);
          res.status(200).json({ data: result, message: "success" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in getAll posts" });
  }
}

async function addPost(req, res, next) {
  try {
    const user_id = res.locals.user_uuid;
    const post_text = req.body.post_text;
    const query =
      "insert into posts(post_uuid, user_id, post_text) values(f_new_uuid(),?,?)";
    sql.query(query, [user_id, post_text], (error, result) => {
      if (error) {
        // console.log("error in addPost: ", error);
        return res
          .status(202)
          .send({ message: "Something went wrong in addPost1, syntax error" });
      } else {
        getAll(req, res, next);
        // res.status(200).json({ message: "post added successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in addPost" });
  }
}

async function editPost(req, res, next) {
  try {
    const post_uuid = req.query.post_uuid;
    const post_text = req.body.post_text;
    const query1 = "select * from posts where post_uuid=?";
    const query2 = "update posts set post_text=? where post_uuid=?";
    sql.query(query1, [post_uuid], (error1, result1) => {
      if (error1) {
        return res
          .status(202)
          .send({ message: "Something went wrong in editPost, syntax error" });
      } else {
        if (result1.length < 1) {
          res
            .status(200)
            .json({ message: "No post available with given uuid" });
        } else {
          sql.query(query2, [post_text, post_uuid], (error2, result2) => {
            if (error2) {
              return res.status(202).send({
                message: "Something went wrong in editPost, syntax error",
              });
            } else {
              res.status(200).json({ message: "Post edited successfully" });
            }
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in editPost" });
  }
}

async function deletePost(req, res, next) {
  try {
    const post_uuid = req.query.post_uuid;
    const query1 = "select * from posts where post_uuid=?";
    const query2 = "delete from posts where post_uuid=?";
    const query3 = "delete from comments where post_id=?";
    sql.query(query1, [post_uuid], (error1, result1) => {
      if (error1) {
        // console.log("error1 in deletePost: ", error1);
        return res.status(202).send({
          message: "Something went wrong in deletePost, syntax error",
        });
      } else {
        // console.log("result1: ", result1);
        if (result1.length < 1) {
          res
            .status(200)
            .json({ message: "No post available with given uuid" });
        } else {
          sql.query(query2, [post_uuid], (error2, result2) => {
            if (error2) {
              // console.log("error2 in deletePost: ", error2);
              return res.status(202).send({
                message: "Something went wrong in deletePost, syntax error",
              });
            } else {
              sql.query(query3, [post_uuid], (error3, result3) => {
                if (error3) {
                  // console.log("error3 in deletePost: ", error3);
                  return res.status(202).send({
                    message: "Something went wrong in deletePost, syntax error",
                  });
                } else {
                  getAll(req, res, next);
                  // console.log("result3: ", result3);
                  // res.status(200).json({
                  //   message: "post deleted successfully",
                  //   post_uuid: post_uuid,
                  // });
                }
              });
            }
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in deletePost" });
  }
}

async function getPostById(req, res, next) {
  try {
    const post_uuid = req.query.post_uuid;
    const query = "select * from posts where post_uuid=?";
    sql.query(query, [post_uuid], (error, result) => {
      if (error) {
        // console.log("error1 in getPostById: ", error);
        return res.status(400).send({
          message: "Something went wrong in getPostById, syntax error",
        });
      } else {
        // console.log("result: ", result);
        if (result.length < 1) {
          res
            .status(200)
            .json({ message: "No post available with given uuid" });
        } else {
          res.status(200).json({ data: result, message: "success" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in getPostById" });
  }
}

async function getAllPostByUserId(req, res, next) {
  try {
    const post_uuid = req.query.post_id;
    const user_id = req.query.user_id;
    const query = "select * from posts where user_id=?";
    sql.query(query, [user_id], (error, result) => {
      if (error) {
        // console.log("error1 in getAllPostByUserId: ", error);
        return res.status(400).send({
          message: "Something went wrong in getAllPostByUserId, syntax error",
        });
      } else {
        // console.log("result: ", result);
        if (result.length < 1) {
          res
            .status(200)
            .json({ message: "no post available with given user_id" });
        } else {
          res.status(200).json({ data: result, message: "success" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in getPostById" });
  }
}

async function getAllLikesOfPostByPostId(req, res, next) {
  try {
    const post_id = req.query.post_id;
    const query = "select * from post_likes where post_id=?";
    sql.query(query, [post_id], (error, result) => {
      if (error) {
        // console.log("error1 in getAllLikesOfPostByPostId: ", error);
        return res.status(400).send({
          message:
            "Something went wrong in getAllLikesOfPostByPostId, syntax error",
        });
      } else {
        // console.log("result: ", result);
        if (result.length < 1) {
          res
            .status(200)
            .json({ data: [], message: "No likes available on this post" });
        } else {
          res.status(200).json({ data: result, message: "success" });
        }
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching in getAllLikesOfPostByPostId" });
  }
}

async function addLikesOfPostByPostId(req, res, next) {
  try {
    const post_id = req.query.post_id;
    const query1 = "select * from post_likes where post_id=?";
    const query2 =
      "insert into post_likes(post_likes_uuid,post_id,likes_count) values(f_new_uuid(),?,?)";
    const query3 = "update post_likes set likes_count=? where post_id=?";

    sql.query(query1, [post_id], (error1, result1) => {
      if (error1) {
        // console.log("error1 in addLikesOfPostByPostId: ", error);
        return res.status(400).send({
          message:
            "Something went wrong in addLikesOfPostByPostId, syntax error",
        });
      } else {
        if (result1.length === 0) {
          sql.query(query2, [post_id, 1], (error2, result2) => {
            if (error2) {
              // console.log("error1 in addLikesOfPostByPostId: ", error);
              res.status(400).send({
                message:
                  "Something went wrong in addLikesOfPostByPostId, syntax error",
              });
            } else {
              getAllLikesOfPostByPostId(req, res, next);
              // res.status(200).json({ message: "success" });
            }
          });
        } else {
          const count = result1[0].likes_count + 1;
          sql.query(query3, [count, post_id], (error3, result3) => {
            if (error3) {
              res.status(400).send({
                message:
                  "Something went wrong in addLikesOfPostByPostId, syntax error",
              });
            } else {
              getAllLikesOfPostByPostId(req, res, next);
              // res.status(200).json({ data: result3, message: "success" });
            }
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in addLikesOfPostByPostId" });
  }
}

async function disLikesOfPostByPostId(req, res, next) {
  try {
    const post_id = req.query.post_id;
    const query1 = "select * from post_likes where post_id=?";
    const query2 =
      "insert into post_likes(post_likes_uuid,post_id,likes_count) values(f_new_uuid(),?,?)";
    const query3 = "update post_likes set likes_count=? where post_id=?";

    sql.query(query1, [post_id], (error1, result1) => {
      if (error1) {
        // console.log("error1 in disLikesOfPostByPostId: ", error);
        return res.status(400).send({
          message:
            "Something went wrong in disLikesOfPostByPostId, syntax error",
        });
      } else {
        if (result1.length === 0) {
          sql.query(query2, [post_id, 1], (error2, result2) => {
            if (error2) {
              // console.log("error1 in disLikesOfPostByPostId: ", error);
              res.status(400).send({
                message:
                  "Something went wrong in disLikesOfPostByPostId, syntax error",
              });
            } else {
              getAllLikesOfPostByPostId(req, res, next);
              // res.status(200).json({ message: "success" });
            }
          });
        } else {
          const count = result1[0].likes_count + 1;
          sql.query(query3, [count, post_id], (error3, result3) => {
            if (error3) {
              res.status(400).send({
                message:
                  "Something went wrong in disLikesOfPostByPostId, syntax error",
              });
            } else {
              getAllLikesOfPostByPostId(req, res, next);
              // res.status(200).json({ data: result3, message: "success" });
            }
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in disLikesOfPostByPostId" });
  }
}

module.exports = {
  getAll,
  addPost,
  editPost,
  deletePost,
  getPostById,
  getAllPostByUserId,
  getAllLikesOfPostByPostId,
  addLikesOfPostByPostId,
  disLikesOfPostByPostId,
};
