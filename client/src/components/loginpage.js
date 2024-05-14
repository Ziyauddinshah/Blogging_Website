import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/userService";

const LoginPage = ({ handleLogin }) => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [logincre, setLogincre] = useState("");

  const Login = () => {
    login(emailId, password).then((response) => {
      if (response.data.message === "login successfully") {
        localStorage.setItem("user_name", response.data.firstname);
        localStorage.setItem("jwt_token", response.data.jwt_Token);
        setLogincre(response.data.message);
        const loginData = [response.data.firstname];
        handleLogin(loginData);
      } else {
        setLogincre(response.data.message);
      }
    });
    setEmailId("");
    setPassword("");
  };

  const logincredential = () => {
    if (logincre === "login successfully") {
      return <h6 className="text-success">Login Successfully..</h6>;
    } else {
      return <h6 className="text-danger">{logincre}</h6>;
    }
  };
  return (
    <div className="container col-md-5 mt-5 p-5 bg-info card shadow rounded">
      <div className="text-center mb-2">
        <h5>Login Here</h5>
      </div>
      <form>
        {logincredential()}
        <div className="form-group mt-2">
          <label htmlFor="exampleInputEmail1" style={{ float: "left" }}>
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter your email address"
            onChange={(e) => {
              setEmailId(e.target.value);
            }}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="exampleInputPassword1" style={{ float: "left" }}>
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div
          className="btn-toolbar justify-content-between mt-4"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <button type="button" className="btn btn-success" onClick={Login}>
            Login
          </button>
          <div className="text-group-prepend">
            <label>
              New User?{" "}
              <Link className="btn btn-primary" to="/register">
                Register
              </Link>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
