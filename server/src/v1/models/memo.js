const mongoose = require("mongoose");

//schemaの作成

const memoSchema = new mongoose.Schema({
  //誰がそのメモを作ったか判断するために、userSchemaと連携する作業をしていく
  user: {
    type: mongoose.Schema.Types.ObjectId,
    //refを設定して名前を指定することで、このschemaのオブジェクトIDがその名前(今回はUser)のオブジェクトIDになる
    ref: "User",
    required: true,
  },
  icon: {
    type: String,
    default: "📝",
  },
  title: {
    type: String,
    default: "Untitled",
  },
  description: {
    type: String,
    default: "Start writing here...",
  },
  position: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  favoritePosition: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Memo", memoSchema);
