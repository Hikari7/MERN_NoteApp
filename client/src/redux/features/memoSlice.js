import { createSlice } from "@reduxjs/toolkit";

//配列でメモを格納
const initialState = { value: [] };

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  //新しい女愛に更新するための仕組み
  reducers: {
    setMemo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setMemo } = memoSlice.actions;
export default memoSlice.reducer;
