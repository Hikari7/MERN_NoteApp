import { ListItemButton, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";
import memoApi from "../../api/memoApi";
import { setFavoriteList } from "../../redux/features/favoriteSlice";

const FavoriteLists = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.value);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const res = await memoApi.getFavorites();

        dispatch(setFavoriteList(res));
        console.log(res);
      } catch (err) {
        alert(err);
      }
    };
    getFavorites();
  }, [dispatch]);

  console.log(favorites);

  return (
    <>
      {favorites.map((favorite, index) => (
        <ListItemButton
          sx={{ pl: "20px" }}
          compoenet={Link}
          to={`/memo/${favorite._id}`}
          key={favorite._id}
        >
          <Typography key={favorite._id}>
            {favorite.icon}
            {favorite.title}
          </Typography>
        </ListItemButton>
      ))}
    </>
  );
};

export default FavoriteLists;
