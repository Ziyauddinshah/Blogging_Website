const sql = require("../database/db");

async function getAll(req, res, next) {
  try {
    const query = "select * from comments order by id asc";
    sql.query(query, [], (error, result) => {
      if (error) {
        // console.log("error in getAll comments: ", error);
        return res.status(400).send({
          message: "Something went wrong in getAll comments, syntax error",
        });
      } else {
        if (result.length < 1) {
          // console.log("result: ", result);
          res.status(200).json({ message: "no comment available" });
        } else {
          //   console.log("result: ", result);
          res.status(200).json({ message: result });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in getAll comments" });
  }
}

async function addComment(req, res, next) {
  try {
    const user_id = res.locals.user_uuid;
    const post_id = req.body.post_uuid;
    const comment_text = req.body.comment_text;
    const query =
      "insert into comments(comment_uuid,user_id,post_id,comment_text) values(f_new_uuid(),?,?,?)";
    sql.query(query, [user_id, post_id, comment_text], (error, result) => {
      if (error) {
        // console.log("error in addComment: ", error);
        return res.status(202).send({
          message: "Something went wrong in addComment, syntax error",
        });
      } else {
        res.status(200).json({ message: "Comment added successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in addComment" });
  }
}

async function editComment(req, res, next) {
  try {
    const comment_uuid = req.query.comment_uuid;
    const comment_text = req.body.comment_text;
    const query1 = "select * from comments where comment_uuid=?";
    const query = "update comments set comment_text=? where comment_uuid=?";
    sql.query(query1, [comment_uuid], (error1, result1) => {
      if (error1) {
        // console.log("error1 in editComment: ", error1);
        return res.status(400).send({
          message: "Something went wrong in editComment, syntax error",
        });
      } else {
        if (result1.length < 1) {
          // console.log("result1: ", result1);
          res.status(401).json({ message: "No comment found with given uuid" });
        } else {
          sql.query(query, [comment_text, comment_uuid], (error2, result2) => {
            if (error2) {
              // console.log("error2 in editComment: ", error2);
              return res.status(400).send({
                message: "Something went wrong in editComment, syntax error",
              });
            } else {
              // console.log("result2: ", result2);
              res.status(200).json({ message: "Comment edited successfully" });
            }
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in editComment" });
  }
}

async function deleteComment(req, res, next) {
  try {
    const comment_uuid = req.query.comment_uuid;
    const query1 = "select * from comments where comment_uuid=?";
    const query2 = "delete from comments where comment_uuid=?";
    sql.query(query1, [comment_uuid], (error1, result1) => {
      if (error1) {
        // console.log("error1 in deleteComment: ", error1);
        return res.status(400).send({
          message: "Something went wrong in deleteComment, syntax error",
        });
      } else {
        if (result1.length < 1) {
          // console.log("result1: ", result1);
          res.status(202).json({ message: "No comment found with given uuid" });
        } else {
          sql.query(query2, [comment_uuid], (error2, result2) => {
            if (error2) {
              // console.log("error2 in deleteComment: ", error2);
              return res.status(202).send({
                message: "Something went wrong in deleteComment, syntax error",
              });
            } else {
              getAll(req, res, next);
              // console.log("result2: ", result2);
              // res.status(200).json({ message: "Comment deleted successfully" });
            }
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in deleteComment" });
  }
}

async function getAllCommentsByPostId(req, res, next) {
  try {
    const post_id = req.query.post_id;
    const query = "select * FROM comments WHERE post_id=?";
    sql.query(query, [post_id], (error, result) => {
      if (error) {
        return res.status(400).send({
          message:
            "Something went wrong in getAllCommentsByPostId, syntax error",
        });
      } else {
        // console.log("result: ", result);
        if (result.length < 1) {
          res.status(202).json({
            data: result,
            message: "No comment found with given post_id",
          });
        } else {
          res.status(200).json({ data: result, message: "success" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in getAllCommentsByPostId" });
  }
}

module.exports = {
  getAll,
  addComment,
  editComment,
  deleteComment,
  getAllCommentsByPostId,
};
