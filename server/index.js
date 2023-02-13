const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv").config();

//jsonオブジェクトとして扱う
app.use(express.json());
//routesを呼び出すためには/api/v1をつけるように設定
app.use("/api/v1", require("./src/v1/routes/auth"));

//Connect to the DB
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("connecting with mongodb!");
} catch (err) {
  console.log(err);
}

app.listen(process.env.PORT || 8000, () => {
  console.log("Server has started...🚀");
});
