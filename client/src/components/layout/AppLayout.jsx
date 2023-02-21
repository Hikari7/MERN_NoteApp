import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../../utils/authUtils";
import Sidebar from "../common/Sidebar";
import { setUser } from "../../redux/features/userSlice";

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    //JWTを持っているのか確認する
    const checkAuth = async () => {
      //JWT認証チェック
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      } else {
        //ユーザーが存在した場合
        //ユーザーを保存する(dispatchでsetUerを更新するように通知する、これがグローバルで使えるようになる)
        dispatch(setUser(user));
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
