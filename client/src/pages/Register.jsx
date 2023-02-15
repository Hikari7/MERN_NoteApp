import { Box, TextField, Button } from "@mui/material";
import React from "react";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Box component="form">
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
        id="confirmpassword"
        label="confirm password"
        margin="normal"
        name="confirmpassword"
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
      <Button component={Link} to="/login" sx={{ textTransform: "none" }}>
        Already have an account?
      </Button>
    </Box>
  );
};

export default Register;
