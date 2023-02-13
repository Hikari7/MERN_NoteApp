const { validationResult } = require("express-validator");

//エラーの出力
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  //エラーだった場合(エラーがからじゃなかった場合)
  if (!errors.isEmpty()) {
    //400番を返す
    return res.status(400).json({ errors: errors.array() });
  }
  //次に進む
  next();
};
