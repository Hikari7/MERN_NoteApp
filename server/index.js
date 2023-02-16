const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");

//corsエラーを回避！！！
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

//jsonオブジェクトとして扱う
app.use(express.json());
//routesを呼び出すためには/api/v1をつけるように設定
app.use("/api/v1", require("./src/v1/routes"));

//Connect to the DB
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("connecting with mongodb!");
} catch (err) {
  console.log(err);
}

app.listen(process.env.PORT || 8000, () => {
  console.log(`Listening Server ${process.env.PORT} ...🚀`);
});
