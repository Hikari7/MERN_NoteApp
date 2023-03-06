import React from "react";
import {
  Drawer,
  ListItemButton,
  List,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import memoApi from "../../api/memoApi";
import { setMemo } from "../../redux/features/memoSlice";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteLists from "./FavoriteLists";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memoId } = useParams();
  const user = useSelector((state) => state.user.value);
  const memos = useSelector((state) => state.memo.value);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();

        dispatch(setMemo(res));
        console.log(res);
      } catch (err) {
        alert(err.message);
      }
    };
    getMemos();
  }, [dispatch]);

  useEffect(() => {
    const activeIndex = memos.findIndex((e) => e._id === memoId);
    setActiveIndex(activeIndex);
  }, []);

  const addMemo = async () => {
    try {
      const res = await memoApi.create();

      const newMemos = [res, ...memos];

      dispatch(setMemo(newMemos));

      navigate(`memo/${res._id}`);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <AppBar position="absolute" sx={{ height: "8vh" }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ color: "secondary.main" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              marginLeft: "auto",
              color: "secondary.main",
              fontFamily: "Zilla Slab",
              letterSpacing: "0.1rem",
            }}
          >
            {user.username}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        sx={{ width: 250, height: "100vh" }}
      >
        <List
          sx={{
            width: 250,
            height: "100vh",
          }}
        >
          <ListItemButton>
            <IconButton onClick={handleDrawerClose} sx={{ marginLeft: "auto" }}>
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>
          </ListItemButton>
          <ListItemButton>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="body2"
                fontWeight="700"
                sx={{ fontFamily: "Zilla Slab", letterSpacing: "0.1rem" }}
              >
                {user.username}
              </Typography>
              <IconButton onClick={logout}>
                <LogoutIcon />
              </IconButton>
            </Box>
          </ListItemButton>

          <Box sx={{ paddingTop: "10px" }}></Box>
          <ListItemButton>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="body2"
                fontWeight="700"
                sx={{ fontFamily: "Zilla Slab", letterSpacing: "0.1rem" }}
              >
                Favorite
              </Typography>
            </Box>
          </ListItemButton>
          <FavoriteLists />
          <Box sx={{ paddingTop: "10px" }}></Box>
          <ListItemButton>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="body2"
                fontWeight="700"
                sx={{ fontFamily: "Zilla Slab", letterSpacing: "0.1rem" }}
              >
                Your notes
              </Typography>
              <IconButton onClick={() => addMemo()}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </ListItemButton>

          {memos.map((item, index) => (
            <ListItemButton
              sx={{ pl: "20px" }}
              compoenet={Link}
              to={`/memo/${item._id}`}
              key={item._id}
              selected={index === activeIndex}
            >
              <Typography>
                {item.icon} {item.title}
              </Typography>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
