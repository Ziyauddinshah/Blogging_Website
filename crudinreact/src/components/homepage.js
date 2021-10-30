import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';
import LoginPage from './loginpage';
import NavbarPage from './navbarpage';

const HomePage = () => {

    // adding post into database
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
            window.location.reload(false);
        }
        else {
            alert('Login to post');
        }
    }
    // adding comment into database
    const [comment, setComment] = useState([]);
    const AddComment = (postid) => {
        // console.log(postkid,comment);
        if(localStorage.getItem('user')) {
            let username = localStorage.getItem('user');
            axios.post('http://localhost:3001/homepage/addcomment', {
                postid: postid,
                username: username,
                comment: comment
            }).then((response) => {
                if (response.data.message) {
                    alert(response.data.message);
                    // setShowPost(createpost);
                }
            });
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
    const ShowComment = (postid) =>{
        // console.log(postid);
        axios.post('http://localhost:3001/homepage/showcomment',
        {PostId: postid}
        ).then((response) => {
            if(response.data <=0 ) alert("no comment on this post");
            setShowComment(response.data);
        });
    }

    // delete post
    const DeletePost = (postid,postusername)=>{
        let username = localStorage.getItem('user');
        if(postusername==username){
            axios.delete(`http://localhost:3001/deletepost/${postid}`);
            window.location.reload(false);
        }
        else {
            alert("You can not delete other`s post");
        }        
    }

    return (
        <div className="container group col-md-6 mt-5 mb-2 p-3 ">
            <div className="row mt-1 mb-2 p-2 shadow rounded ">
                <div className="col-10 ">
                    <input type="text "
                        className="form-control border border-primary"
                        placeholder="Add your post here.."
                        onChange={(e) => {
                            createPost(e.target.value);
                        }} />
                </div>
                <div className="col-2">
                    <button className="btn btn-primary" onClick={Post}>Post</button>
                </div>
            </div>
            <div className="form-group bg-dark card row shadow rounded">
                <div className="col-md-12">
                    {
                        showpost.map((val) => {
                            return (
                                <div>
                                    <div className="mb-3 mt-3">
                                        <div>
                                            <h6 className="text-light">Showing Post</h6>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-12 p-2 bg-light card post" data-id="{val.post}">
                                            <div class="bg-light d-flex justify-content-between">
                                                <div><b>{val.username}</b></div>
                                                <div>
                                                    <a type="submit" className="btn btn-dark border-success"
                                                        value="${val.postid}"
                                                        onClick={()=> DeletePost(val.postid,val.username)}>Delete
                                                    </a>
                                                </div>
                                            </div>
                                            < hr/>
                                            {val.post}
                                        </div>
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <div>
                                            <h6 className="text-light">Comment On Post</h6>
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
                                                    value="${val.postid}"
                                                    onClick={()=> AddComment(val.postid)}>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                    <h6 className="mt-4" >
                                        <button type="button" className="btn btn-primary"
                                                    onClick={()=> ShowComment(val.postid)}>Show Comments
                                        </button>
                                    </h6>
                                    <div className="text-light mt-3 p-1 ">
                                        {
                                            showcomment.map((value,index) => {
                                                if(value.postid == val.postid){
                                                    return <tr>{index+1}: {value.comment}</tr>
                                                }
                                            })
                                        }
                                    </div>
                                    <hr className="text-light"/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default HomePage;
