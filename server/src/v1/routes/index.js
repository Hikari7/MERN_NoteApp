const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/memo", require("./memo"));

module.exports = router;
