import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { editPost } from "../services/postService";

const PostEditPage = () => {
  const location = useLocation();
  const [textInput, setTextInput] = useState("");
  //   const [postUUID, setPostUUID] = useState("");
  useEffect(() => {
    setTextInput(location.state.post_text);
    // setPostUUID(location.state.post_uuid);
  }, [location]);

  const handleChange = (event) => {
    setTextInput(event.target.value);
  };

  //edit post
  const EditPost = async (post_uuid) => {
    editPost(post_uuid, textInput).then((response) => {
      if (response.data.message) {
        alert(response.data.message);
        console.log(response.data.message);
      }
      setTextInput(textInput);
    });
  };

  return (
    <div className="container col-md-6 mt-3">
      <div className="form-group bg-dark card row shadow rounded mb-2">
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
