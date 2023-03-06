import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import React from "react";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmErrText, setConfirmErrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmErrText("");

    const data = new FormData(e.target);

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

    if (error) return;

    setLoading(true);

    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });

      setLoading(false);

      localStorage.setItem("token", res.token);
      console.log("success!");
      navigate("/");
    } catch (err) {
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((err) => {
        if (err.param === "username") {
          setUsernameErrText(err.msg);
        }
        if (err.param === "password") {
          setPasswordErrText(err.msg);
        }
        if (err.param === "confirmPassword") {
          setConfirmErrText(err.msg);
        }
      });
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2, textTransform: "none" }}
          fullWidth
          type="submit"
          loading={loading}
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
