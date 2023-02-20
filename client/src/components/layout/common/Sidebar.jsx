import React from "react";
import {
  Drawer,
  ListItemButton,
  List,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
// import StarOutlineIcon from "@mui/icons-material/StarOutline";
import assets from "../../../assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import memoApi from "../../../api/memoApi";
import { setMemo } from "../../../redux/features/memoSlice";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //固有のmemoを取り出していく
  //useParams: react-router-domのHooksでURLのパラメーターに含まれているメモIDを取り出すことができる
  const { memoId } = useParams();
  //useSelectorで取り出していく
  const user = useSelector((state) => state.user.value);
  const memos = useSelector((state) => state.memo.value);

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

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <Drawer
        container={window.document.body}
        variant="temporary"
        open={openDrawer}
        onClose={toggleDrawer}
        sx={{ width: 250, height: "100vh" }}
      >
        <List
          sx={{
            width: 250,
            height: "100vh",
            backgroundColor: assets.colors.secondary,
          }}
        >
          <Box sx={{ paddingTop: "10px" }}></Box>

          <Button>
            <KeyboardDoubleArrowLeftIcon onClick={toggleDrawer} />
          </Button>

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
              <Typography variant="body2" fontWeight="700">
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
              <Typography variant="body2" fontWeight="700">
                Favorite
              </Typography>
              {/* <IconButton>
              <StarOutlineIcon fontSize="small" />
            </IconButton> */}
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
              <Typography variant="body2" fontWeight="700">
                Memo
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
