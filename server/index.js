const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

// npm run devstart make node server live
// "test": "echo \"Error: no test specified\" && exit 1"

const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const session = require("express-session");

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    credentials:true, //access-control-allow-credentials:true
    optionSuccessStatus:200
}));
app.use(cookieparser());
// app.use(bodyParser.urlencoded({extended: true}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "reactjs_crud_mysql",
    port: "3308"
});

// checking db connection
db.connect((error) => {
    if(error)
        throw error;
    console.log("mysql connected");
})

// show all posts
app.get("/homepage/showpost", (req,res) => {
    const sqlSelect = "SELECT * FROM posts ORDER BY post DESC";
    db.query(sqlSelect,(error,result) =>{
        res.send(result);
    })
})

// show all comment
app.post("/homepage/showcomment", (req1,res1) => {
    const postid = req1.body.PostId;
    const sqlSelect = "SELECT * FROM commentonpost WHERE postid = ?";
    db.query(sqlSelect,[postid],(error,result) =>{
        var string=JSON.stringify(result);
        // console.log(string);
        var json =  JSON.parse(string);
        //// to get one value here is the option
        // console.log(json);
        // console.log(result);
        res1.send(json);
    })
})

//adding post
app.post("/homepage/addpost",(request,response) =>{
    const post = request.body.post;
    const username = request.body.username;
    const InsertPost = "INSERT INTO posts(post,username) VALUES(?,?)";
    db.query(InsertPost,[post,username],(err,result) => {
        if(err) {
            // console.log(error)
            response.send(err);
        }
        else{
            // console.log(result);
            response.send({id: result.insertId});
        }
    })
})

//deleting post
app.delete("/deletepost/:postid",(request,response) =>{
    const deletepostid = request.params.postid;
    // console.log(deletepostid);
    const DeletePost = "DELETE from posts where postid = ?";
    db.query(DeletePost,[deletepostid],(err,result) => {
        if(err) {
            console.log(err)
            // response.send(err);
        }
        else{
            console.log('Number of rows deleted = ' + result.affectedRows);
            // console.log(result);
            // response.send(result);
        }
    });
    // window.location.reload(false);
})

// adding comment
app.post("/homepage/addcomment",(request,response) => {
    const postid = request.body.postid;
    const username = request.body.username;
    const comment = request.body.comment;
    // console.log(postid,username,comment);
    const InsertPost = "INSERT INTO commentonpost(username,postid,comment) VALUES(?,?,?)";
    db.query(InsertPost,[username,postid,comment],(err,result) => {
        if(err) {
            // console.log(error)
            response.send(err);
        }
        else {
            // console.log(result)
            response.send({message: "Success"});
        }
    })
})

//registration process
app.post("/registerpage" ,(request,response) => {
    const firstname = request.body.firstname;
    const email = request.body.email;
    const password = request.body.password;
    bcrypt.hash(password,saltRounds,(err,hashpassword) => {
        if(err)
            response.send(err);
        const sqlInsert = "INSERT INTO userregistration (firstname,email,password) VALUES(?,?,?)";
        db.query(sqlInsert, [firstname,email,hashpassword], (error) =>{
            if(error) {
                response.send(error);
            }
            else {
                response.send({message: 'Success !'});
            }   
        })
    });
})

//login process
app.post("/loginpage" ,(request,response) => {
    const name = request.body.emailoruserid;
    const email = name;
    const password = request.body.password;
    const sqlInsert = "SELECT * FROM userregistration WHERE firstname = ? OR email = ?";
    db.query(sqlInsert,[name,email], (error,result) =>{
        if(error)
            response.send({error: error});
        if(result.length > 0) {
            bcrypt.compare(password,result[0].password,(err,res) => {
                if(res) {
                    response.send(result);
                }
                else {
                    response.send({message: "Wrong login credentials!"});
                }
            });
        }  
        else{
            response.send({message: "User does not exist!"});
        }    
    });
});

app.listen(3001, () =>{
    console.log("running on port 3001");
})
