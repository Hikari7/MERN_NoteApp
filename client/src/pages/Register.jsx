import { Box, TextField, Button } from "@mui/material";
import React from "react";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import authApi from "../api/authApi";

const Register = () => {
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    //入力欄の文字列を取得
    const data = new FormData(e.target);

    //"username"は<TextField/>内で取得したname属性から
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();

    console.log(username);
    console.log(password);
    console.log(confirmPassword);

    //新規登録APIを叩く
    try {
      //suthApiのparamsをここでいれる(bodyに挿入される→serverに渡されて暗号化されたり)
      const res = await authApi.register({
        //ここがbackendのreq.bodyに相当する
        username,
        password,
        confirmPassword,
      });
      //レスポンスとして帰ってきたトークン属性をローカルストレージに保存
      //サーバーのresの中のtokenを入れる
      localStorage.setItem("token", res.token);
      console.log("success!");
    } catch (err) {
      console.log(err);
     const errors = err.data.errors;
      console.log(errors);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="username"
          label="User name"
          margin="normal"
          name="username"
          required
        />
        <TextField
          fullWidth
          id="password"
          label="password"
          margin="normal"
          name="password"
          type="password"
          required
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="confirm password"
          margin="normal"
          name="confirmPassword"
          type="password"
          required
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2, textTransform: "none" }}
          fullWidth
          type="submit"
          loading={false}
          color="primary"
          variant="outlined"
        >
          Create your account
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login" sx={{ textTransform: "none" }}>
        Already have an account?
      </Button>
    </>
  );
};

export default Register;
