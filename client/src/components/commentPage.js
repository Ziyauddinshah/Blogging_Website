import React, { useState, useEffect } from "react";
import {
  addCommentAction,
  editCommentAction,
  deleteCommentAction,
  getAllCommentsOfOnePostAction,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import "../commentPageCss.css";

const CommentPage = (props) => {
  const dispatch = useDispatch();
  const [addCommentText, setAddCommentText] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [commentEdit, setCommentEdit] = useState(false);
  const [editCommentText, setEditCommentText] = useState("");
  const [editCommentId, setEditCommentId] = useState("");

  let { commentDataForOnePost } = useSelector((state) => state.comment);
  commentDataForOnePost = commentDataForOnePost.data;
  useEffect(() => {
    if (props.loggedInUserId) {
      setLoggedInUserId(props.loggedInUserId);
    }
  }, [props]);
  // adding comment into database
  const addComment = (postid) => {
    const isLogin = localStorage.getItem("jwt_token");
    const jwt_token = localStorage.getItem("jwt_token");
    if (isLogin) {
      if (addCommentText) {
        const data = {
          post_uuid: postid,
          comment_text: addCommentText,
          jwt_token: jwt_token,
        };
        dispatch(addCommentAction(data));
        setAddCommentText("");
        alert("Comment Added");
      } else {
        alert("Comment input can not be null");
      }
    } else {
      alert("Unauthenticated user, Login first!");
    }
  };

  const handleToggleComment = (postid) => {
    if (!showComments) {
      dispatch(getAllCommentsOfOnePostAction(postid));
      setShowComments(!showComments);
    } else {
      setShowComments(!showComments);
    }
  };

  const editComment = (comment_uuid, user_id, comment_text) => {
    if (loggedInUserId === user_id) {
      setCommentEdit(!commentEdit);
      setEditCommentId(comment_uuid);
      setEditCommentText(comment_text);
    } else {
      alert("Unauthorized user, You can not edit other's comment");
    }
  };

  const saveEditedComment = (comment_uuid, user_id) => {
    if (loggedInUserId === user_id) {
      setEditCommentId(comment_uuid);
      const jwt_token = localStorage.getItem("jwt_token");
      const data = {
        comment_uuid: comment_uuid,
        comment_text: editCommentText,
        jwt_token: jwt_token,
      };
      dispatch(editCommentAction(data));
      setCommentEdit(!commentEdit);
      alert("Comment Edited");
      setEditCommentText(editCommentText);
    } else {
      alert("Unauthorize user, You can not edit other's comment");
      setCommentEdit(!commentEdit);
    }
  };

  const deleteComment = (comment_uuid, user_id) => {
    if (loggedInUserId === user_id) {
      const jwt_token = localStorage.getItem("jwt_token");
      if (window.confirm("Do you want to delete this?")) {
        const data = { comment_uuid: comment_uuid, jwt_token: jwt_token };
        dispatch(deleteCommentAction(data));
        commentDataForOnePost = commentDataForOnePost.filter(
          (data) => data.comment_uuid !== comment_uuid
        );
      }
    } else {
      alert("Unauthorize user, You can not delete other's comment");
      setCommentEdit(!commentEdit);
    }
  };

  return (
    <>
      <div
        key={props.index}
        className="form-group bg-dark card row shadow rounded"
      >
        <div className="mb-3 mt-3">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-9">
              <input
                type="text"
                className="form-control"
                placeholder="Add comment.."
                value={addCommentText}
                onChange={(e) => {
                  setAddCommentText(e.target.value);
                }}
              />
            </div>
            <div className="col-3 col-md-3">
              <button
                type="button"
                className="form-control btn btn-primary"
                onClick={() => addComment(props.postid)}
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
            key={props.index}
          >
            <ul key={props.index}>
              {commentDataForOnePost &&
                commentDataForOnePost.map((value, index) => {
                  return (
                    props.postid === value.post_id && (
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
                          {loggedInUserId ? (
                            <div className="two">
                              <button
                                type="button"
                                style={{ marginRight: 5 + "px" }}
                                className="btn btn-primary btn-sm"
                                onClick={() =>
                                  commentEdit
                                    ? saveEditedComment(
                                        value.comment_uuid,
                                        value.user_id
                                      )
                                    : editComment(
                                        value.comment_uuid,
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
                                className="btn btn-info btn-sm"
                                onClick={() =>
                                  deleteComment(
                                    value.comment_uuid,
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
                    )
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
