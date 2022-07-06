import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
const NavbarPage = () => {

    let value = 1;
    // const [username,setUser] = useState([]);
    let username = "";
    if (localStorage.getItem('user')) {
        // setUser(localStorage.getItem('user'));
        username = localStorage.getItem('user');
        // console.log(user);
        value = 0;
    }

    const Logout = () => {
        localStorage.removeItem("user");
        value=1;
        window.location.reload(false);
    }
    const logincredential = () => {
        if (value == 1) {
            return <NavLink className="btn btn-outline-light " exact to="/loginpage"><b>Login</b></NavLink>;
        } else {
            return (
                <div className="row">
                    <div className="col-6 mt-1">
                        <NavLink className="text-white text-decoration-none" exact to="/userprofilepage">
                           Hi {username}
                        </NavLink>
                    </div>
                    <div className="col-4">
                        <button className="btn btn-primary" onClick={Logout}>
                            logout
                        </button>
                    </div>
                </div>
            )
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-info ">
            <div className="container ">
                <NavLink className="navbar-brand " exact to="/">
<<<<<<< HEAD
                    <h3 className="text-danger">Social Baatein</h3>
=======
                    <h4 className="text-danger fw-bold">Social Baatein</h4>
>>>>>>> b83ca934 (doing more changes)
                    </NavLink>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link " exact to="/"><h6> Home </h6></NavLink>
                        </li>
                    </ul>
                </div>
                {logincredential()}
            </div>
        </nav>
    )
}

export default NavbarPage;
