const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
const cors = require("cors");
app.use(cors());

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send("Page not found");
});

var PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
