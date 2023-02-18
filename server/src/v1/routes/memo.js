const router = require("express").Router();
const memoController = require("../controllers/memo");
const tokenHandler = require("../middleware/tokenHandler");

//memoを作成
//tokenの中身をチェックしてログインしているのかどうか
router.post("/", tokenHandler.verifyToken, memoController.create);

module.exports = router;
