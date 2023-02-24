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
// import StarOutlineIcon from "@mui/icons-material/StarOutline";
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
  //固有のmemoを取り出していく
  //useParams: react-router-domのHooksでURLのパラメーターに含まれているメモIDを取り出すことができる
  const { memoId } = useParams();
  //useSelectorで取り出していく
  //sliceのnameで取り出せる(user, memoの部分)
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
    //tokenのkeyを取り外す必要がある
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    //asyncを取得するために関数を作る
    const getMemos = async () => {
      try {
        //memoApiからメモをゲットするAPIを呼ぶ
        const res = await memoApi.getAll();
        //メモもグローバルで保存したいのでReduxで管理していく
        dispatch(setMemo(res));
        console.log(res);
      } catch (err) {
        alert(err);
      }
    };
    getMemos();

    //dispatchが発火すると同時にuseEffectも発火する(更新がされる->memoが作られる度)
  }, [dispatch]);

  useEffect(() => {
    //findIndex:引数に指定したコールバック関数の中で定義した条件式を満たす要素を配列の先頭から検索する
    //クリックしたものがmemoIdを等しければ、それをtrueにしてactiveIndexの中に格納している
    const activeIndex = memos.findIndex((e) => e._id === memoId);
    setActiveIndex(activeIndex);
  }, []);

  const addMemo = async () => {
    try {
      //メモを作成
      const res = await memoApi.create();
      //resを今までのmemoにさらに追加していく
      const newMemos = [res, ...memos];
      //新しいmemosをグローバルで管理していく
      dispatch(setMemo(newMemos));
      //で、追加したメモにリダイレクトする
      navigate(`memo/${res._id}`);
    } catch (err) {
      alert(err);
    }
  };

  // console.log(user);
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
              //選ばれているのがハイライトされる
              selected={index === activeIndex}
              // selected={activeIndex}
              // onChange={() => {
              //   setActiveIndex(!activeIndex);
              // }}
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
