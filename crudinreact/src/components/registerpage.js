import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import NavbarPage from './navbarpage';

const RegisterPage = () => {

    const [firstname, setFirstName] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);

    const Register = () =>{
        axios.post("http://localhost:3001/registerpage", {
            firstname: firstname,
            email: email,
            password: password
        }).then((response) => {
            if(response.data.message) {
                alert(response.data.message);
            } 
            else {
                alert("error");
            }
        })  
    };

    return (
        <div className="container col-md-5 mt-5 p-5 bg-info card shadow rounded">
            <div className="text-center mb-2">
                <h5>Registration Page</h5>
            </div>
            <form >
                <div className="form-group mb-3">
                    <input type="text" 
                    className="form-control" 
                    placeholder="Your Name *" required 
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }} />
                </div>
                <div className="form-group mb-3">
                    <input type="email" 
                    className="form-control" 
                    aria-pressed="false" 
                    autoComplete="off" 
                    placeholder="Your Email *" 
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}/>
                </div>
                <div className="form-group mb-3">
                    <input type="password" 
                    className="form-control" 
                    placeholder="Password *" 
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                    autoComplete="off" required 
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                </div>
                <div className="btn-toolbar justify-content-between mt-4" role="toolbar" aria-label="Toolbar with button groups">
                    <button type="submit" className="btn btn-success" onClick={Register}> Register </button>
                    <div className="text-group-prepend">
                        <label>Already User? 
                            <NavLink className="btn btn-primary" exact to="./loginpage" >Login</NavLink>
                        </label>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default RegisterPage;