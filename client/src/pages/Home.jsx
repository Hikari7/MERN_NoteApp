import React from "react";
import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import memoApi from "../api/memoApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createMemo = async () => {
    //API叩くときは基本try catch文
    try {
      setLoading(true);
      //memoを作る関数create()を呼ぶ
      const res = await memoApi.create();
      console.log(res);
      //memo固有のIDに遷移してあげる
      navigate(`/memo/${res._id}`);
    } catch (err) {
      console.log("err?");
      alert(err);
    } finally {
      //finally: tryに行ってもcatchに行っても実行される
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton
        variant="outlined"
        onClick={() => createMemo()}
        loading={false}
      >
        Create a new memo
      </LoadingButton>
    </Box>
  );
};

export default Home;
