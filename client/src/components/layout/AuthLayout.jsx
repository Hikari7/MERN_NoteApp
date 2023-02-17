import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import notionLogo from "../../assets/images/notion-logo.png";
import authUtils from "../../utils/authUtils";

//tokenをチェックするロジックを組む
const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //JWTを持っているのか確認する
    const checkAuth = async () => {
      //JWT認証チェック
      const isAuth = await authUtils.isAuthenticated();
      if (isAuth) {
        navigate("/");
      }
    };
    checkAuth();
    //page遷移するたびに発火するようにする
  }, [navigate]);
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
        {/* 認証関係のコンポーネントを全て含んでいる共通のコンポーネント */}
        <Outlet />
      </Container>
    </>
  );
};

export default AuthLayout;
