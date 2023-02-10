const express = require("express");
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("./src/v1/models/user");

const app = express();
const dotenv = require("dotenv").config();

//Connect to the DB
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("connecting with mongodb!");
} catch (err) {
  console.log(err);
}

app.post("/register", async (req, res) => {
  //receive the pw
  const password = req.body.password;
  try {
    //pwの暗号化
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
    //ユーザーの新規作成(DBへ保存)
    const user = await User.create(req.body);
    //JWTの発行
    //各ユーザーごとに割り振られたMongoDBでに保存されているUserIDをもとにJWTを発行していく
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(200).json({ user, token });
  } catch(err) {
    return res.status(500).json(err)
  }
});

app.get("/", (req, res) => {
  res.send("Hello express");
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server has started...🚀");
});
