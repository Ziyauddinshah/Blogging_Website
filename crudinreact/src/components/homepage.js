import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';
import LoginPage from './loginpage';
import NavbarPage from './navbarpage';

const HomePage = () => {

    // const [list, setList] = useState([]);
    const [createpost, createPost] = useState([]);
    
    const [createdpostid,setCreatedPostId] = useState([]);
    const Post = () => {
        if (localStorage.getItem('user')) {
            let username = localStorage.getItem('user');
            axios.post('http://localhost:3001/homepage/addpost', {
                post: createpost,
                username: username
            }).then((response) => {
                if (response.data.id) {
                    alert("Success");
                    // setCreatedPost(createpost);
                    setCreatedPostId(response.data.id);
                }
            });
        }
        else {
            alert('Login to post');
        }
    }

    const [comment, setComment] = useState([]);
    const [createdpost, setCreatedPost] = useState([]);
    // const [showcomment, setShowComment] = useState([]);
    const AddComment = (e) => {
        const post = e;
        if (localStorage.getItem('user')) {
            let username = localStorage.getItem('user');
            axios.post('http://localhost:3001/homepage/addcomment', {
                post: post,
                username: username,
                comment: comment
            }).then((response) => {
                if (response.data.message) {
                    alert(response.data.message);
                    // setShowPost(createpost);
                }
            });
            // alert(post);
        }
        else {
            alert('Login first!')
        }
    }


    // show post
    const [showpost, setShowPost] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/homepage/showpost').then((response) => {
            setShowPost(response.data);
        });
    },[]);

    // show comment
    const [showcomment, setShowComment] = useState([]);
    const ShowComment = (e) =>{
        // alert(e)
        axios.post('http://localhost:3001/homepage',
        {post: e}
        ).then((response) => {
            // console.log(response.data);
            setShowComment(response.data);
        });
    }

    return (
        <div className="container group col-md-6 mt-5 mb-2 p-3 ">
            <div className="row mt-1 mb-2 p-2 shadow rounded">
                <div className="col-10">
                    <input type="text"
                        className="form-control"
                        placeholder="Add your post here.."
                        onChange={(e) => {
                            createPost(e.target.value);
                        }} />
                </div>
                <div className="col-2">
                    <button className="btn btn-primary" onClick={Post}>Post</button>
                </div>
            </div>
            <div className="form-group bg-info card row shadow rounded">

                <div className="col-md-12">
                    {
                        showpost.map((val) => {
                            // setCreatedPost(val.post);
                            return (
                                <>
                                    <div className="mb-3 mt-3">
                                        <div>
                                            <h6>Showing Post</h6>
                                        </div>
                                        <div className="col-12 p-1 bg-secondary card post" data-id="{val.post}">
                                            {val.post}
                                        </div>
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <div>
                                            <h6>Comment Here</h6>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-9">
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="Add comment.."
                                                    onChange={(e) => {
                                                        setComment(e.target.value);
                                                    }} />
                                            </div>
                                            <div className="col-3 col-md-3">
                                                <button type="button"
                                                    className="btn btn-primary"
                                                    value="${val.post}"
                                                    onClick={()=> AddComment(val.post)}>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                    <h6 className="mt-4" >
                                        <button type="button"
                                                    className="btn btn-primary"
                                                    onClick={()=> ShowComment(val.post)}>Show Comments
                                        </button>
                                    </h6>
                                    <div className="mt-3 p-1 ">
                                        {
                                            showcomment.map((value) => {
                                                if(value.post == val.post){
                                                    return <tr> {value.comment}</tr>
                                                }
                                            })
                                        }
                                    </div>
                                    <hr />
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default HomePage;