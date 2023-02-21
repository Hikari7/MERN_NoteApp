import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import Picker from "@emoji-mart/react";

const EmojiPicker = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  const showPicker = () => {
    setIsShowPicker(!isShowPicker);
  };

  const selectEmoji = (e) => {
    //console.log(e);
    const emojiCode = e.unified.split("-");
    // console.log(emojiCode);
    let codesArray = [];
    emojiCode.forEach((el) => codesArray.push("0x" + el));
    // console.log(codesArray);
    //codeから絵文字に変換する
    const emoji = String.fromCodePoint(...codesArray);
    //emojiを取り出すことに成功！
    console.log(emoji);
    setIsShowPicker(false);
    //onChangeの引数にこの選択されたemojiを入れることで、親のMemoのnewIconとして引き渡される
    props.onChange(emoji);
  };

  return (
    <Box>
      <Typography
        variant="h2"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={showPicker}
      >
        {/* {props.icon} */}
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          zIndex: 10,
        }}
      >
        <Picker onEmojiSelect={selectEmoji} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
