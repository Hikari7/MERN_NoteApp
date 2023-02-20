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
    //positionの順番でソートしていく
    const memos = await Memo.find({ user: req.user._id }).sort("-position");
    res.status(200).json(memos);
  } catch {
    res.status(500).json(err);
  }
};

//1つのメモの取り出しAPI
exports.getOne = async (req, res) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("any memo is not created yet");
    res.status(200).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};

//メモ編集API
exports.update = async (req, res) => {
  const { memoId } = req.params;
  const { title, description } = req.body;

  try {
    if (title === "") req.body.title = "untitled";
    if (description === "") req.body.description = "write your memo";

    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("any memo is not created yet");

    const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
      //$set: 色んなプロパティを含めるよ〜
      $set: req.body,
    });
    res.status(200).json(updatedMemo);
  } catch (err) {
    res.status(500).json(err);
  }
};
