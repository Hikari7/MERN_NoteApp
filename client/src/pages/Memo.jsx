import { IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import memoApi from "../api/memoApi";

const Memo = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(
    () => {
      const getMemo = async () => {
        try {
          console.log(memoId);
          const res = await memoApi.getOne(memoId);
          // console.log(res);
          setTitle(res.title);
          setDescription(res.description);
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

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          width: "100%",
        }}
      >
        <IconButton>
          <StarOutlineIcon />
        </IconButton>
        <IconButton caritant="outlined" color="error">
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <TextField
          onChange={updateTitle}
          value={title}
          placeholder="Untitled"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: 700 },
          }}
        />
        <TextField
          onChange={updateDescription}
          value={description}
          placeholder="add new"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": { fontSize: "1rem", fontWeight: 700 },
          }}
        />
      </Box>
    </>
  );
};

export default Memo;
