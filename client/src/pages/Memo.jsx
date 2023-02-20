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
