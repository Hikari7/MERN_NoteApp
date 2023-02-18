const router = require("express").Router();

//http://localhost:8000/api/v1/auth/registerのエンドポイントを叩けるように

//　"/register"のエンドポイントを叩くためには、"/auth"を前につけなきゃいけない
router.use("/auth", require("./auth"));

//memo version
router.use("/memo", require("./memo"));

module.exports = router;
