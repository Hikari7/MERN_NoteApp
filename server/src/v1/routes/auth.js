const router = require("express").Router();
const { body } = require("express-validator");

const User = require("../models/user");
const validation = require("../middleware/validation");
const userController = require("../controllers/user");
const tokenHandler = require("../middleware/tokenHandler");

//ユーザーの新規登録API
router.post(
  "/register",
  //express validatorでバリデーションチェック
  body("username")
    .isLength({ min: 8 })
    .withMessage("user name must be more than 8letters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("pass word must be more than 8letters"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("comfirm pass word must be more than 8letters"),
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("This user is already exist");
      }
    });
  }),
  validation.validate,
  userController.register
);

//ログイン用API
router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("user name must be more than 8letters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be more than 8letters"),

  //validation関数を返す
  validation.validate,
  userController.login
);

//JWT認証API
//(1./veiry-tokenのAPIが呼ばれる, 2.middlewareで認証チェック(nextに当たったら), 3.通ったらreturnの200番を返す)
router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
  //200番だったらuserの情報を返す
  return res.status(200).json({ user: req.user });
  //ここでPOST MAN使って既にあるユーザーIDで再度ログインできるか試すと良い("/verify-token"のパス使って)
});

module.exports = router;
