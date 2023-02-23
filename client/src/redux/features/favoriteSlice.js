import { createSlice } from "@reduxjs/toolkit";

//配列でメモを格納
const initialState = { value: [] };

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  //新しい状態に更新するための仕組み
  reducers: {
    setFavorite: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;

//favoriteグローバルで管理していい感じに取り出す
