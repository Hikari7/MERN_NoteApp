import { Box, TextField, Button } from "@mui/material";
import React from "react";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import authApi from "../api/authApi";
import { useState } from "react";

const Register = () => {
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmErrText, setConfirmErrText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmErrText("");

    //入力欄の文字列を取得
    const data = new FormData(e.target);

    //"username"は<TextField/>内で取得したname属性から
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();

    console.log(username);
    console.log(password);
    console.log(confirmPassword);

    let error = false;

    if (username === "") {
      error = true;
      setUsernameErrText("Please enter a name");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("Please enter a password");
    }
    if (confirmPassword === "") {
      error = true;
      setConfirmErrText("Please enter a password");
    }
    if (password !== confirmPassword) {
      error = true;
      setConfirmErrText("password doesn't match");
    }

    //errorだったら以下の処理はせずに返しちゃう
    if (error) return;

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
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="User name"
          margin="normal"
          name="username"
          required
          helperText={usernameErrText}
          error={usernameErrText !== ""}
        />
        <TextField
          fullWidth
          id="password"
          label="password"
          margin="normal"
          name="password"
          type="password"
          required
          helperText={passwordErrText}
          error={passwordErrText !== ""}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="confirm password"
          margin="normal"
          name="confirmPassword"
          type="password"
          required
          helperText={confirmErrText}
          error={confirmErrText !== ""}
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
