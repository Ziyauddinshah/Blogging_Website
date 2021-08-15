import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import axios from "axios";

// import Link from 'bootstrap';

const LoginPage = () => {

    const [emailoruserid, setEmailorUserid] = useState([]);
    const [password, setPassword] = useState([]);
    const [logincre, setLogincre] = useState([]);

    axios.defaults.withCredentials = true;

    const Login = () => {
        axios.post("http://localhost:3001/loginpage", {
            emailoruserid: emailoruserid,
            password: password
        }).then((response) => {
            if (response.data.message) {
                setLogincre(response.data.message);
            }
            else {
                localStorage.setItem('user', response.data[0].firstname);
                // const token = setEmailorUserid({
                //     emailoruserid
                // });
                // setToken(token);
                setLogincre(response.data[0]);
            }
        });
    };

    // useEffect( () =>{
    //     axios.get('http://localhost:3001/loginpage')
    //     .then((response) =>{
    //         // console.log(error);
    //         console.log(response.data);
    //     })
    // },[]);

    const logincredential = () => {
        if (logincre == 'Wrong login credentials!') {
            return <h6 className="text-danger">Wrong login credentials!</h6>;
        } else if (logincre.firstname) {
            return <h6 className="text-dark">Login Successfully..</h6>;
        } else if (logincre == 'User does not exist!') {
            return <h6 className="text-danger">User does not exist!!</h6>;
        }
    }
    return (
        <div className="container col-md-5 mt-5 p-5 bg-info card shadow rounded">
            <div className="text-center mb-2">
                <h5>Login Here</h5>
            </div>
            <form >
                {logincredential()}
                <div className="form-group mt-2">
                    <label for="exampleInputEmail1">Email address / UserId</label>
                    <input type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter email / UserId"
                        onChange={(e) => {
                            setEmailorUserid(e.target.value);
                        }} />
                </div>
                <div className="form-group mt-2">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                </div>
                <div className="btn-toolbar justify-content-between mt-4" role="toolbar" aria-label="Toolbar with button groups">
                    <button type="button"
                        className="btn btn-success"
                        onClick={Login} >Login</button>
                    <div className="text-group-prepend">
                        <label>New User? <a className="btn btn-primary" href="./registerpage" >Register</a>
                        </label>
                    </div>
                </div>
            </form>
        </div>

    )
}
export default LoginPage;
// LoginPage.propTypes = {
//     setToken: PropTypes.func.isRequired
//   };