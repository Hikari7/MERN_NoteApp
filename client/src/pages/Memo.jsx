import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../api/memoApi";
import { useDispatch, useSelector } from "react-redux";
import { setMemo } from "../redux/features/memoSlice";
import EmojiPicker from "../components/common/EmojiPicker";

const Memo = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memos = useSelector((state) => state.memo.value);

  useEffect(
    () => {
      const getMemo = async () => {
        try {
          console.log(memoId);
          //memoの中に入っているものを取得
          const res = await memoApi.getOne(memoId);
          // console.log(res);
          setTitle(res.title);
          setDescription(res.description);
          setIcon(res.icon);
        } catch (err) {
          alert(err);
        }
      };
      getMemo();
    },
    //memoIdが変わるたびに変更される
    [memoId]
  );

  let timer;
  const timeout = 500;

  const updateTitle = async (e) => {
    //0.5秒よりも少なかったらclearTimeoutになるのでAPIが呼ばれなくなる
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(async () => {
      try {
        //memoAPIの第一引数、第二引数は取得したい値に合わせる
        await memoApi.update(memoId, { title: newTitle });
      } catch (err) {
        alert(err);
      }
      //500ミリ秒で呼ばれる
    }, timeout);
  };
  const updateDescription = async (e) => {
    //0.5秒よりも少なかったらclearTimeoutになるのでAPIが呼ばれなくなる
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        //memoAPIの第一引数、第二引数は取得したい値に合わせる
        await memoApi.update(memoId, { description: newDescription });
      } catch (err) {
        alert(err);
      }
      //500ミリ秒で呼ばれる
    }, timeout);
  };

  const deleteMemo = async () => {
    try {
      const deletedMemo = await memoApi.delete(memoId);
      console.log(deletedMemo);

      //メモを削除した分、全体のメモの数を減らさないといけない
      const newMemos = memos.filter((e) => e._id !== memoId);

      //メモを削除したら、pathが迷子になるのでredirect先のpathを指定してあげる
      //メモがなかった場合、新規作成画面に
      if (newMemos.length === 0) {
        navigate("/memo");
      } else {
        //一番上のメモに遷移
        navigate(`/memo/${newMemos[0]._id}`);
      }
      //and then, その最新のメモたちをReduxを用いてグローバル規模で更新する
      dispatch(setMemo(newMemos));
    } catch (err) {
      alert(err);
    }
  };

  const onIconChange = async (newIcon) => {
    //memosを一時的にコピーしてそれを修正していく(直接データいじるのは良くないから)
    let temp = [...memos];
    //選択されたメモを取り出す
    const index = temp.findIndex((e) => e._id === memoId);
    //選択した絵文字を今現在の選択していメモのアイコンフィールドに追加する
    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(newIcon);

    //更新のAPIを叩いて、newIconに上書きする
    dispatch(setMemo(temp));
    try {
      await memoApi.update(memoId, { icon: newIcon });
    } catch (err) {
      alert(err);
    }
  };

  const createTitle = () => {
    if (title === "Untitled") setTitle("");
  };

  const createDescription = () => {
    if (description === "Start writing here...") setDescription("");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "64%",
          height: "80vh",
          marginTop: "10vh",
          marginX: "auto",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <EmojiPicker icon={icon} onChange={onIconChange} />
            <Box
              sx={{
                hight: "50%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: 2,
              }}
            >
              <StarOutlineIcon
                color="primary"
                sx={{
                  display: "block",
                  "&:hover": {
                    cursor: "pointer",
                    opacity: 0.3,
                  },
                }}
              />

              <DeleteOutlineIcon
                caritant="outlined"
                color="error"
                onClick={deleteMemo}
                sx={{
                  display: "block",
                  marginLeft: 2,
                  "&:hover": {
                    cursor: "pointer",
                    opacity: 0.3,
                  },
                }}
              />
            </Box>
          </Box>
          <TextField
            onClick={createTitle}
            onChange={updateTitle}
            value={title}
            placeholder="Untitled"
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": { fontSize: "3rem", fontWeight: 700 },
              marginY: 2,
              fontFamily: "Zilla Slab",
              letterSpacing: "0.1rem",
            }}
          />
          <TextField
            onClick={createDescription}
            onChange={updateDescription}
            value={description}
            placeholder="Start writing here..."
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": { fontSize: "1rem", fontWeight: 700 },
              letterSpacing: "0.05rem",
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Memo;
