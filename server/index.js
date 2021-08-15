const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
// "nodemon": "^2.0.12"
// "devstart": "nodemon index.js",
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const session = require("express-session");

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET","POST"],
    credentials: true
}));
app.use(cookieparser());
// app.use(bodyParser.urlencoded({extended: true}));

// app.use(
//     session({
//         key: "user",
//         secret: "subscribe",
//         resave: false,
//         saveUninitialized: false,
//         cookie:{
//             expire: 60 * 60 * 5,
//         },
//     })
// );

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "reactjs_crud_mysql",
    port: "3308"
});

db.connect((error) => {
    if(error)
        throw error;
    console.log("mysql connected");
})

// show all posts
app.get("/homepage/showpost", (req,res) => {
    const sqlSelect = "SELECT * FROM posts ";
    db.query(sqlSelect,(error,result) =>{
        // console.log(result);
        res.send(result);
    })
})

// show all comment
app.post("/homepage", (req1,res1) => {
    const post = req1.body.post;
    // console.log(post1);
    const sqlSelect = "SELECT * FROM commentonpost WHERE post = ?";
    db.query(sqlSelect,[post],(error,result) =>{
        // console.log(error)
        // throw result;
        var string=JSON.stringify(result);
        // console.log(string);
        var json =  JSON.parse(string);
        // to get one value here is the option
        console.log(json);
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

// adding comment
app.post("/homepage/addcomment",(request,response) => {
    const post = request.body.post;
    const username = request.body.username;
    const comment = request.body.comment;
    const InsertPost = "INSERT INTO commentonpost(username,post,comment) VALUES(?,?,?)";
    db.query(InsertPost,[username,post,comment],(err,result) => {
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

// app.get("/login", (req,res) => {
//     if(req.session.user) {
//         res.send({loggedIn: true, user: req.session.user});
//     }
//     else{
//         res.send({loggedIn: false});
//     }
// });


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

// app.get('/', (request,response) => {
//     const sqlInsert = "INSERT INTO movies (movie_name, movie_review) VALUES('yodha', 'good');";
//     db.query(sqlInsert, (error,result) =>{
//         response.send("Inserted");
//     })
    
// })
app.listen(3001, () =>{
    console.log("running on port 3001");
})
