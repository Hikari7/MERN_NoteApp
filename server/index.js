const express = require("express");
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const { body } = requre("express-validator");
const User = require("./src/v1/models/user");
const { validationResult } = require("express-validator");

const app = express();
const dotenv = require("dotenv").config();

//jsonオブジェクトとして扱う
app.use(express.json());

//Connect to the DB
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("connecting with mongodb!");
} catch (err) {
  console.log(err);
}

//ユーザーの新規登録API
app.post(
  "/register",
  //express validatorでバリデーションチェック
  body("username")
    .isLength({ min: 8 })
    .withMessage("user name must be more than 8letters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("pass word must be more than 8letters"),
  body("confirmpassword")
    .isLength({ min: 8 })
    .withMessage("comfirm pass word must be more than 8letters"),
  body("username").costom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("This user is already exist");
      }
    });
  }),
  //エラーの出力
  (req, res, next) => {
    const errors = validationResult(req);
    //エラーだった場合(エラーがからじゃなかった場合)
    if (!errors.isEmpty()) {
      //400番を返す
      return res.status(400).json({ errors: errors.array() });
    }
    //次に進む
    next();
  },
  async (req, res) => {
    //receive the pw
    const password = req.body.password;
    try {
      //pwの暗号化
      req.body.password = CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      );
      //ユーザーの新規作成(DBへ保存)
      const user = await User.create(req.body);
      //JWTの発行
      //各ユーザーごとに割り振られたMongoDBでに保存されているUserIDをもとにJWTを発行していく
      const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      });
      return res.status(200).json({ user, token });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

app.get("/", (req, res) => {
  res.send("Hello express");
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server has started...🚀");
});
