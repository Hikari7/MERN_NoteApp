const router = require("express").Router();
const { body } = require("express-validator");
const User = require("../models/user");
const validation = require("../middleware/validation");
const userController = require("../controllers/user");

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
  body("confirmpassword")
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

module.exports = router;
