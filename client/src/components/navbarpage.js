import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const NavbarPage = ({ loggedInUser }) => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(loggedInUser);
  }, [loggedInUser]);

  const Logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("jwt_token");
    setUsername("");
  };
  const logincredential = () => {
    return (
      <div className="row">
        <div className="col-6 mt-1">
          <NavLink
            className="text-white text-decoration-none"
            to="/userprofilepage"
          >
            {username}
          </NavLink>
        </div>
        <div className="col-4">
          {username ? (
            <button className="btn btn-outline-light" onClick={() => Logout()}>
              Logout
            </button>
          ) : (
            <NavLink
              style={{ marginRight: 20 + "px" }}
              className="btn btn-outline-light"
              to="/login"
            >
              <b>Login</b>
            </NavLink>
          )}
        </div>
      </div>
    );
  };
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-info ">
      <div className="container ">
        <NavLink className="navbar-brand " to="/">
          <h3 className="text-danger">Social Baatein</h3>
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                <h6> Home </h6>
              </NavLink>
            </li>
          </ul>
        </div>
        {logincredential()}
      </div>
    </nav>
  );
};

export default NavbarPage;
