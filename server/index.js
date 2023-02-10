const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;
const dotenv = require("dotenv").config();

//Connect to the DB
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("connecting with mongodb!");
} catch (err) {
  console.log(err);
}

app.get("/", (req, res) => {
  res.send("Hello express");
});

app.listen(PORT, () => {
  console.log("listening server now🚀");
});
