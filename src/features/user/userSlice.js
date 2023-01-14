import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserId: (state, action) => {
      state.userId = action.payload;
    }
  }
});

export const selectUserId = (state) => state.user.userId;

export const { addUserId } = userSlice.actions;

export default userSlice.reducer;
