const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

app.use("/api/v1", require("./src/v1/routes"));

try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("connecting with mongodb!");
} catch (err) {
  console.log(err);
}

app.listen(process.env.PORT || 8000, () => {
  console.log(`Listening Server ${process.env.PORT} ...🚀`);
});
