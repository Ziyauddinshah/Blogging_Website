import React, { useState, useEffect } from "react";
import { getAllCommentsOfOnePost } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../services/postService";
import { editCommentService } from "../services/postService";
import "../commentPageCss.css";

const CommentPage = (props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [commentEdit, setCommentEdit] = useState(false);
  const [editCommentText, setEditCommentText] = useState("");
  const [editCommentId, setEditCommentId] = useState("");
  const [postId, setPostId] = useState("");

  let { commentDataForOnePost } = useSelector((state) => state.comment);
  commentDataForOnePost = commentDataForOnePost.data;
  // adding comment into database

  const AddComment = (postid) => {
    if (localStorage.getItem("userName")) {
      addComment(postid, comment).then((response) => {
        if (response.data.message) {
          setComment("");
          alert(response.data.message);
        }
      });
    } else {
      alert("Login first!");
    }
  };

  const handleToggleComment = (postid) => {
    if (showComments) {
      setPostId("");
      setShowComments(false);
    } else {
      setPostId(postid);
      setShowComments(true);
    }
  };

  useEffect(() => {
    const jwt_token = localStorage.getItem("jwt_token");
    if (jwt_token) {
      setIsLoggedIn(true);
    }
    if (props.loggedInUserId) {
      setLoggedInUserId(props.loggedInUserId);
    }
    dispatch(getAllCommentsOfOnePost(postId));
  }, [postId, dispatch, props]);

  const editComment = (comment_uuid, post_id, user_id, comment_text) => {
    if (loggedInUserId === user_id) {
      setCommentEdit(!commentEdit);
      setEditCommentId(comment_uuid);
      setEditCommentText(comment_text);
      console.log("edit comment button is clicked ");
    } else {
      alert("You can not edit other's post");
    }
  };

  const saveComment = (comment_uuid, post_id, user_id) => {
    if (loggedInUserId === user_id) {
      console.log("save comment ", editCommentText);
      setEditCommentId(comment_uuid);
      // console.log(
      //   "comment_id: " +
      //     comment_uuid +
      //     ", post_id: " +
      //     post_id +
      //     ", user_id: " +
      //     user_id
      // );
      editCommentService(comment_uuid, post_id, user_id, editCommentText).then(
        (response) => {
          if (response.data.message) {
            setCommentEdit(!commentEdit);
            alert(response.data.message);
            setEditCommentText(editCommentText);
          }
        }
      );
    } else {
      alert("You can not edit other's comment");
      setCommentEdit(!commentEdit);
    }
  };
  const deleteComment = (comment_uuid, post_id, user_id) => {
    if (loggedInUserId === user_id) {
      console.log("delete comment ");
      console.log(
        "comment_id: " +
          comment_uuid +
          ", post_id: " +
          post_id +
          ", user_id: " +
          user_id
      );
    } else {
      alert("You can not delete other's comment");
      setCommentEdit(!commentEdit);
    }
  };
  return (
    <>
      <div
        key={props.index}
        className="form-group bg-dark card row shadow rounded mb-2"
      >
        <div className="mb-3 mt-3">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-9">
              <input
                type="text"
                className="form-control"
                placeholder="Add comment.."
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </div>
            <div className="col-3 col-md-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => AddComment(props.postid)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="mt-1">
          <button
            type="button"
            className="btn btn-primary mb-2"
            style={{ float: "left" }}
            onClick={() => handleToggleComment(props.postid)}
          >
            {showComments ? "Hide" : "Show"} Comments
          </button>
        </div>
        {showComments ? (
          <div
            className="text-light mt-3"
            style={{
              maxHeight: 200 + "px",
              minHeight: 5 + "px",
              overflowY: "scroll",
            }}
          >
            <ul key={props.index}>
              {commentDataForOnePost &&
                commentDataForOnePost.map((value, index) => {
                  return (
                    <li
                      key={index}
                      style={{ textAlign: "left", marginBottom: 2 + "px" }}
                    >
                      <div key={value.comment_uuid} className="outer">
                        <div key={value.comment_uuid} className="one">
                          {commentEdit &&
                          editCommentId === value.comment_uuid ? (
                            <input
                              type="text"
                              value={editCommentText}
                              onChange={(e) =>
                                setEditCommentText(e.target.value)
                              }
                              style={{ width: 95 + "%" }}
                            />
                          ) : editCommentText &&
                            editCommentId === value.comment_uuid ? (
                            editCommentText
                          ) : (
                            value.comment_text
                          )}
                        </div>
                        {isLoggedIn ? (
                          <div className="two">
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() =>
                                commentEdit
                                  ? saveComment(
                                      value.comment_uuid,
                                      value.post_id,
                                      value.user_id
                                    )
                                  : editComment(
                                      value.comment_uuid,
                                      value.post_id,
                                      value.user_id,
                                      value.comment_text
                                    )
                              }
                            >
                              {commentEdit &&
                              editCommentId === value.comment_uuid
                                ? "📁"
                                : "✏️"}
                            </button>
                            <button
                              type="button"
                              className="btn btn-light btn-sm"
                              onClick={() =>
                                deleteComment(
                                  value.comment_uuid,
                                  value.post_id,
                                  value.user_id
                                )
                              }
                            >
                              ❌
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              {commentDataForOnePost !== undefined &&
              commentDataForOnePost.length < 1 ? (
                <li style={{ wordWrap: "break-word" }}>
                  <span style={{ float: "left" }}>No Comments</span>
                </li>
              ) : null}
            </ul>
            <br />
          </div>
        ) : null}
      </div>
    </>
  );
};
export default CommentPage;
