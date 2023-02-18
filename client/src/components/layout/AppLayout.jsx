import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../../utils/authUtils";
import Sidebar from "./common/Sidebar";

const AppLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //JWTを持っているのか確認する
    const checkAuth = async () => {
      //JWT認証チェック
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      }
    };
    checkAuth();
    //page遷移するたびに発火するようにする
  }, [navigate]);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          {/* Outletを入れることでApp.jsxのRoute内に適用することができる */}
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AppLayout;
