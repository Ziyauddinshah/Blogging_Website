import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostAction, addPostAction } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import PostPage from "./postPage";
import { getAllUserService } from "../services/userService";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [postText, setPostText] = useState("");
  let { postDataFromDB, message } = useSelector((state) => state.post);
  if (message === "Token expired") {
    localStorage.removeItem("userName");
    localStorage.removeItem("jwt_token");
    navigate("/login");
  }
  if (postDataFromDB) postDataFromDB = postDataFromDB.data;
  useEffect(() => {
    dispatch(getPostAction());
    const name = localStorage.getItem("userName");
    const jwt_token = localStorage.getItem("jwt_token");
    if (name) {
      setUserName(name);
      setToken(jwt_token);
      getAllUserService(jwt_token).then((response) => {
        const data = response.data.result;
        setUserData(data);
      });
    }
  }, [dispatch]);
  if (postDataFromDB && userData) {
    const data = [];
    userData.forEach((user) => {
      postDataFromDB.forEach((post) => {
        if (post.user_id === user.user_uuid) {
          const item = {
            id: post.id,
            post_uuid: post.post_uuid,
            user_id: post.user_id,
            user_name: user.firstname,
            post_text: post.post_text,
            created_at: post.created_at,
          };
          data.push(item);
        }
      });
    });
    postDataFromDB = data;
    console.log(postDataFromDB);
  }
  // adding post into database
  const AddPost = () => {
    if (userName) {
      const dataToPost = {
        post_text: postText,
        token: token,
      };
      dispatch(addPostAction(dataToPost));
    } else {
      alert("Login to post");
    }
    setPostText("");
  };

  return (
    <div
      className="container group col-md-6 mt-2 mb-2 "
      style={{ height: 500 + "px", overflowY: "scroll" }}
    >
      <div className="row sticky-top mb-2 p-2 shadow bg-info ">
        <div className="col-10 ">
          <input
            type="text "
            className="form-control border border-primary"
            placeholder="Add your post here.."
            value={postText}
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          />
        </div>
        <div className="col-2">
          <button className="btn btn-primary" onClick={() => AddPost()}>
            Post
          </button>
        </div>
      </div>
      <div className="col-md-12">
        {postDataFromDB &&
          postDataFromDB.map((val, index) => {
            return (
              <PostPage
                key={index}
                index={index}
                post_uuid={val.post_uuid}
                user_id={val.user_id}
                post_text={val.post_text}
                user_name={val.user_name}
              />
            );
          })}
      </div>
    </div>
  );
};
export default HomePage;
