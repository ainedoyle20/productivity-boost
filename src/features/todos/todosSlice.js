import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todosObject: {},
  status: null
}

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodosObject(state, action) {
      state.todosObject = action.payload;
    },
    updateStatus(state, action) {
      state.status = action.payload;
    }
  }
});

export const selectTodosObject = (state) => state.todos.todosObject;

export const selectCurrentTodos = createSelector(
  [selectTodosObject, (state, currentDate) => currentDate],
  (todosObject, currentDate) => todosObject[currentDate]
);

export const { setTodosObject, updateStatus} = todosSlice.actions;

export default todosSlice.reducer;
