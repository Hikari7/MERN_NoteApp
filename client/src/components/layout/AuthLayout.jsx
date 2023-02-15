import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import notionLogo from "../../assets/images/notion-logo.png";

const AuthLayout = () => {
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={notionLogo}
            alt=""
            style={{ width: 100, height: 100, marginBottom: 3 }}
          />
          Notion clone
        </Box>
        <Outlet />
      </Container>
    </>
  );
};

export default AuthLayout;
