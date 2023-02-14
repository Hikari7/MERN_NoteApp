const JWT = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../models/user");

//新規登録用API
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

//userログイン用API
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //dbからユーザーから存在するか探してくる
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        errors: "username",
        message: "invalid username",
      });
    }

    //pwが合っているか照合する
    const descryptedPassword = CryptoJS.AES.decrypt(
      //JWTによって暗号化されたPWを復号する必要がある
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    //↑復号したpwを文字列として認識

    if (descryptedPassword !== password) {
      return res.status(401).json({
        errors: {
          param: "password",
          message: "invalid password",
        },
      });
    }

    //JWTを発行
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });

    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};
