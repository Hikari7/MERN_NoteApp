import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,

  reducers: {
    setFavoriteList: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFavoriteList } = favoriteSlice.actions;
export default favoriteSlice.reducer;
