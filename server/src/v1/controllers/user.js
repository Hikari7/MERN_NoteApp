const JWT = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../models/user");

//新規登録用
exports.register = async (req, res) => {
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
  } catch (err) {
    return res.status(500).json(err);
  }
};
