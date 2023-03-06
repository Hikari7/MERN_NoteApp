const router = require("express").Router();
const { body } = require("express-validator");
const User = require("../models/user");
const validation = require("../middleware/validation");
const userController = require("../controllers/user");
const tokenHandler = require("../middleware/tokenHandler");

router.post(
  "/register",

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

router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("user name must be more than 8letters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be more than 8letters"),

  validation.validate,
  userController.login
);

router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
  return res.status(200).json({ user: req.user });
});

module.exports = router;
