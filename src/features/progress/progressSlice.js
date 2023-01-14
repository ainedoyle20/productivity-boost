import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  progressObject: {},
}

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setProgressObject(state, action) {
      state.progressObject = action.payload;
    },
  }
});

export const selectProgressObject = (state) => state.progress.progressObject;

export const selectProgressDataForMonth = createSelector(
  [selectProgressObject, (state, currentMonthYear) => currentMonthYear],
  (progressObject, currentMonthYear) => progressObject[currentMonthYear]
);

export const { setProgressObject } = progressSlice.actions;

export default progressSlice.reducer;
