import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editPostAction } from "../redux/actions";

const PostEditPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [textInput, setTextInput] = useState("");
  useEffect(() => {
    setTextInput(location.state.post_text);
  }, [location]);

  const handleChange = (event) => {
    setTextInput(event.target.value);
  };

  //edit post
  const EditPost = async (post_uuid) => {
    const jwt_token = localStorage.getItem("jwt_token");
    const data = {
      post_uuid: post_uuid,
      post_text: textInput,
      jwt_token: jwt_token,
    };
    dispatch(editPostAction(data));
    setTextInput(textInput);
    alert("Post Edited");
  };

  return (
    <div className="container col-md-6 mt-3">
      <div className="form-group bg-info card row shadow rounded mb-2">
        <div className="mb-3 mt-3">
          <div>
            <h6 className="text-light" style={{ float: "left" }}>
              Showing Post
            </h6>
          </div>
          <div
            className="col-12 col-sm-6 col-md-12 p-2 bg-light card post"
            data-id="{val.post}"
          >
            <div className="bg-light d-flex justify-content-between">
              <div>
                <b>User Id: {location.state.user_id}</b>
              </div>
              <div>
                <Link
                  to={"/home"}
                  className="btn btn-dark"
                  style={{ marginRight: 5 + "px" }}
                >
                  Back
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => EditPost(location.state.post_uuid)}
                >
                  Save
                </button>
              </div>
            </div>
            <hr />
            <input
              value={textInput}
              onChange={handleChange}
              style={{ height: 50 + "px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostEditPage;
