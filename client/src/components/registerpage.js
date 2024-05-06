import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { register } from "../services/userService";

const RegisterPage = () => {
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const SubmitButton = () => {
    if (firstname && password && email) {
      return (
        <button
          type="button"
          className="btn btn-success"
          onClick={() => Register()}
        >
          Register
        </button>
      );
    } else {
      return (
        <button type="button" className="btn btn-success" disabled>
          Register
        </button>
      );
    }
  };

  const Register = () => {
    register(firstname, email, password).then((response) => {
      setMessage(response.data.message);
    });
  };

  return (
    <div className="container col-md-5 mt-5 p-5 bg-info card shadow rounded">
      <div className="text-center mb-2">
        <h5>Registration Page</h5>
        <span
          style={{
            float: "left",
            marginTop: 10 + "px",
            color: "black",
          }}
        >
          {message}
        </span>
      </div>

      <form>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputName" style={{ float: "left" }}>
            Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Your Name *"
            required
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputEmail" style={{ float: "left" }}>
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            autoComplete="off"
            placeholder="Your Email *"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputPassword" style={{ float: "left" }}>
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Password *"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            autoComplete="off"
            required
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
          {SubmitButton()}
          <div className="text-group-prepend">
            <label>
              Already User?
              <NavLink className="btn btn-primary" to="/login">
                Login
              </NavLink>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;
