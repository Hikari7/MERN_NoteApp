const Memo = require("../models/memo");

//APIの作成
exports.create = async (req, res) => {
  try {
    //memoの個数をカウントできる
    const memoCount = await Memo.find().count();
    //メモ新規作成(APIを作る)
    const memo = await Memo.create({
      user: req.user._id,
      //ドラッグ&ドロップするときのポジション
      //memoが1つ以上あれば返されて、なければ0が反映される
      position: memoCount > 0 ? memoCount : 0,
    });
    res.status(201).json(memo);
  } catch {
    res.status(500).json(err);
  }
};

//メモを取り出しAPI
exports.getAll = async (req, res) => {
  try {
    //今ログインしているUserの目を全て取り出す
    //positionの順番で
    const memos = await Memo.find({ user: req.user._id }).sort("-position");
    res.status(200).json(memos);
  } catch {
    res.status(500).json(err);
  }
};
