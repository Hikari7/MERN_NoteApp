import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FavoriteLists = () => {
  const [favorite, setFavorite] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector((state) => state.favorite.value);

  return <div></div>;
};

export default FavoriteLists;
