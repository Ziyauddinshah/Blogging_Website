const nodemailer = require("nodemailer");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ziyauddin270499@gmail.com",
    pass: "bcvg tnqv nyyz nqyw",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
