const Memo = require("../models/memo");

exports.create = async (req, res) => {
  try {
    const memoCount = await Memo.find().count();

    const memo = await Memo.create({
      user: req.user._id,

      position: memoCount > 0 ? memoCount : 0,
    });
    res.status(201).json(memo);
  } catch {
    res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const memos = await Memo.find({ user: req.user._id }).sort("-position");
    res.status(200).json(memos);
  } catch {
    res.status(500).json(err);
  }
};

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

exports.update = async (req, res) => {
  const { memoId } = req.params;
  const { title, description, favorite } = req.body;

  try {
    if (title === "") req.body.title = "untitled";
    if (description === "") req.body.description = "write your memo";

    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("any memo is not created yet");

    const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
      $set: req.body,
    });

    res.status(200).json(updatedMemo);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  const { memoId } = req.params;
  try {
    const deletedMemo = await Memo.deleteOne({
      _id: memoId,
    });
    console.log(deletedMemo);
    res.status(200).json("successful to delete the memo");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Memo.find({
      user: req.user._id,
      favorite: true,
    });
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json(err);
  }
};
