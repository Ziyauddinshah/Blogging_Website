var mysql = require("mysql");
require("dotenv").config();

var database = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

database.connect(function (error) {
  if (error) {
    console.log("database connection failed!");
    throw error;
  }
  console.log("database connected!");
});

module.exports = database;
