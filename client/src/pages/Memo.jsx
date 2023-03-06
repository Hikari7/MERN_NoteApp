import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  DialogTitle,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../api/memoApi";
import { useDispatch, useSelector } from "react-redux";
import { setMemo } from "../redux/features/memoSlice";
import EmojiPicker from "../components/common/EmojiPicker";
import { setFavoriteList } from "../redux/features/favoriteSlice";

const Memo = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const memos = useSelector((state) => state.memo.value);
  const favoriteMemos = useSelector((state) => state.favorite.value);

  useEffect(() => {
    const getMemo = async () => {
      try {
        console.log(memoId);
        const res = await memoApi.getOne(memoId);
        setTitle(res.title);
        setDescription(res.description);
        setIcon(res.icon);
        setIsFavorite(res.favorite);
      } catch (err) {
        alert(err);
      }
    };
    getMemo();
  }, [memoId]);

  let timer;
  const timeout = 500;

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };
  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { description: newDescription });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const handleClickOpen = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const deleteMemo = async () => {
    try {
      setShowAlert(true);
      const deletedMemo = await memoApi.delete(memoId);

      const newMemos = memos.filter((e) => e._id !== memoId);

      if (newMemos.length === 0) {
        navigate("/memo");
      } else {
        navigate(`/memo/${newMemos[0]._id}`);
      }

      dispatch(setMemo(newMemos));
    } catch (err) {
      alert(err);
    }
  };

  const onIconChange = async (newIcon) => {
    let temp = [...memos];

    const index = temp.findIndex((e) => e._id === memoId);

    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(newIcon);

    dispatch(setMemo(temp));
    try {
      await memoApi.update(memoId, { icon: newIcon });
    } catch (err) {
      alert(err);
    }
  };

  const createTitle = () => {
    if (title === "Untitled") setTitle("");
  };

  const createDescription = () => {
    if (description === "Start writing here...") setDescription("");
  };

  const addFavorite = async () => {
    try {
      const memo = await memoApi.update(memoId, { favorite: true });

      let newFavoriteMemos = [...favoriteMemos];

      setIsFavorite(true);
      newFavoriteMemos.push(memo);

      await memoApi.update(memoId, { favorite: true });

      console.log(newFavoriteMemos);
      dispatch(setFavoriteList(newFavoriteMemos));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFavorite = async () => {
    try {
      const memo = await memoApi.update(memoId, { favorite: false });
      let newFavoriteMemos = [...favoriteMemos];
      await memoApi.update(memoId, { favorite: false });
      newFavoriteMemos = newFavoriteMemos.filter((m) => m.id !== memo.id);
      setIsFavorite(false);
      dispatch(setFavoriteList(newFavoriteMemos));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "64%",
          height: "80vh",
          marginTop: "10vh",
          marginX: "auto",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <EmojiPicker icon={icon} onChange={onIconChange} />
            <Box
              sx={{
                hight: "50%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: 2,
              }}
            >
              {isFavorite ? (
                <StarOutlineIcon
                  onClick={deleteFavorite}
                  color="warning"
                  sx={{
                    display: "block",
                    "&:hover": {
                      cursor: "pointer",
                      opacity: 0.3,
                    },
                  }}
                />
              ) : (
                <StarOutlineIcon
                  onClick={addFavorite}
                  color="primary"
                  sx={{
                    display: "block",
                    "&:hover": {
                      cursor: "pointer",
                      opacity: 0.3,
                    },
                  }}
                />
              )}

              {showAlert && (
                <Dialog
                  open={showAlert}
                  onClose={handleCloseAlert}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Confirm delete"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to delete the note?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseAlert} size="small">
                      Cancel
                    </Button>
                    <Button
                      onClick={deleteMemo}
                      autoFocus
                      color="error"
                      size="small"
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              )}

              <DeleteOutlineIcon
                caritant="outlined"
                color="error"
                onClick={handleClickOpen}
                sx={{
                  display: "block",
                  marginLeft: 2,
                  "&:hover": {
                    cursor: "pointer",
                    opacity: 0.3,
                  },
                }}
              />
            </Box>
          </Box>

          <TextField
            onClick={createTitle}
            onChange={updateTitle}
            value={title}
            placeholder="Untitled"
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": { fontSize: "3rem", fontWeight: 700 },

              marginY: 2,
              fontFamily: "Zilla Slab",
              letterSpacing: "0.1rem",
            }}
          />
          <TextField
            onClick={createDescription}
            onChange={updateDescription}
            value={description}
            multiline
            placeholder="Start writing here..."
            variant="outlined"
            // fullWidth

   
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": { fontSize: "1rem", fontWeight: 700 },
              letterSpacing: "0.05rem",
              width: "100%",
              overflowWrap: "break-word",
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Memo;
