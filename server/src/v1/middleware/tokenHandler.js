const JWT = require("jsonwebtoken");
const User = require("../models/user");

//クライアントが以前、サーバーが送ったtokenなのかどうか判断するためにJWTをデコード(複合)する
//クライアントから渡されたJETが正常化検証
const tokenDecode = (req) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    //JWT(payload部分)を取り出す
    const bearer = bearerHeader.split(" ")[1];
    try {
      //verify関数でdecode化する
      const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodedToken;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

//JWT認証を検証するためのmiddleware(token版のvalidationチェックみたいなもの)
exports.verifyToken = async (req, res, next) => {
    //JWTからdecodedされたものを持ってくる(reqを受け取る)
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    //そのJWTと一致するユーザーを探してくる
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      return res.status(401).json("Unauthorized");
    }
    //新しくuserを更新する
    req.user = user;
    //middlewareでは必ずnext関数を入れてあげる(middlewareの次の動作に操作する)
    next();
  } else {
    return res.status(401).json("Unauthorized");
  }
};
