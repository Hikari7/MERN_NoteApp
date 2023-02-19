const router = require("express").Router();
const memoController = require("../controllers/memo");
const tokenHandler = require("../middleware/tokenHandler");

//ここのRoutesが大元になるよ

//APIの作成
//tokenの中身をチェックしてログインしているのかどうか
router.post("/", tokenHandler.verifyToken, memoController.create);

//メモの取り出しAPI
// define the "/" page route
router.get("/", tokenHandler.verifyToken, memoController.getAll);

module.exports = router;
