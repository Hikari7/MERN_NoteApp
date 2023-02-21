import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import noteIcon from "../../assets/images/noteIcon.png";
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
          <Typography
            variant="h3"
            sx={{ marginY: 3, fontFamily: "Zilla Slab" }}
          >
            Memo App
          </Typography>

          <img
            src={noteIcon}
            alt=""
            style={{ width: 100, height: 100, marginBottom: 5 }}
          />
        </Box>

        {/* 認証関係のコンポーネントを全て含んでいる共通のコンポーネント */}
        <Outlet />
      </Container>
    </>
  );
};

export default AuthLayout;
