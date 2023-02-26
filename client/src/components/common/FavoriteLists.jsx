import { ListItemButton, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../../api/memoApi";
import { setFavoriteList } from "../../redux/features/favoriteSlice";

const FavoriteLists = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.value);
  // //useParams: react-router-domのHooksでURLのパラメーターに含まれているメモIDを取り出すことができる
  // //memoIdパスがそのまま使えるようになる
  // const { memoId } = useParams();

  useEffect(() => {
    //asyncを取得するために関数を作る
    const getFavorites = async () => {
      try {
        //memoApiからメモをゲットするAPIを呼ぶ
        const res = await memoApi.getFavorites();

        dispatch(setFavoriteList(res));
        console.log(res);
      } catch (err) {
        alert(err);
      }
    };
    getFavorites();

    //dispatchが発火すると同時にuseEffectも発火する(更新がされる->memoが作られる度)
  }, [dispatch]);

  console.log(favorites);

  return (
    <>
      {favorites.map((favorite) => (
        <Typography key={favorite._id}>{favorite.title}</Typography>
      ))}
      {/* <ListItemButton>
        <Typography>{favorites.favorite}</Typography>
      </ListItemButton> */}
    </>
  );
};

export default FavoriteLists;
