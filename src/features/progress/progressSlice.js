import { createSelector, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getDataPerDay, getDataPerWeek, getDataPerMonth } from "../../app/utils";
import { getProgressData } from "../../app/firebase";

const initialState = {
  progressObject: {},
}

export const fetchProgressData = createAsyncThunk("progress/fetchProgressData", async (id) => {
  const progressObject = await getProgressData(id);
  return progressObject;
});

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setProgressObject(state, action) {
      state.progressObject = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProgressData.fulfilled, (state, action) => {
      state.progressObject = action.payload;
    })
  }
});

const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
}

export const selectProgressObject = (state) => state.progress.progressObject;

export const selectDatePercentageObject = createSelector(
  [selectProgressObject, (state, currentMonthYear) => currentMonthYear],
  (progressObject, currentMonthYear) => progressObject[currentMonthYear]
);

export const selectChartData = createSelector(
  [selectProgressObject, (state, configureOptions) => configureOptions],
  (progressObject, configureOptions) => {
    const { currentMonthYear, dataOption } = configureOptions;
    
    const datePercentageObject = progressObject[currentMonthYear];

    if (!datePercentageObject || !Object.keys(datePercentageObject).length) return undefined;

    let axes;
    if (dataOption === "day") {
      axes = getDataPerDay(datePercentageObject, currentMonthYear);
    } else if (dataOption === "week") {
      axes = getDataPerWeek(datePercentageObject, currentMonthYear);
    } else {
      axes = getDataPerMonth(datePercentageObject, currentMonthYear);
    }

    return axes;
  }
);

export const { setProgressObject } = progressSlice.actions;

export default progressSlice.reducer;
