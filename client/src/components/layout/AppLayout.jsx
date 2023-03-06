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
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      } else {
        dispatch(setUser(user));
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AppLayout;
