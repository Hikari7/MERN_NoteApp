import { createSlice } from "@reduxjs/toolkit";

//何もuserが存在しない状態
const initialState = { value: {} };

export const userSlice = createSlice({
  name: "user",
  initialState,
  //新しい女愛に更新するための仕組み
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
