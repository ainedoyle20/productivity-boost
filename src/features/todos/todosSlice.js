import { createSelector, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTodos, updateTodos } from "../../app/firebase";

const initialState = {
  todosObject: {},
}

export const fetchTodosFromFirebase = createAsyncThunk("todos/fetchTodosFromFirebase", async (id) => {
  const todosObject = await getTodos(id);
  return todosObject;
});

export const updateFirebaseTodos = createAsyncThunk("todos/updateFirebaseTodos", async (data) => {
  const {id, todaysTodosObject} = data;
  await updateTodos(id, todaysTodosObject);
  const todosObject = await getTodos(id);
  return todosObject;
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodosObject(state, action) {
      state.todosObject = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodosFromFirebase.fulfilled, (state, action) => {
        state.todosObject = action.payload;
      })
      .addCase(updateFirebaseTodos.fulfilled, (state, action) => {
        state.todosObject = action.payload;
      })
  }
});

export const selectTodosObject = (state) => state.todos.todosObject;

export const selectCurrentTodos = createSelector(
  [selectTodosObject, (state, currentDate) => currentDate],
  (todosObject, currentDate) => {
    if (!todosObject) {
      return undefined;
    } else {
      return todosObject[currentDate];
    }
  }
);

export const selectTodosList = createSelector(
  [selectTodosObject, (state, todaysDate) => todaysDate],
  (todosObject, todaysDate) => {
    if (!todosObject || !todosObject[todaysDate]) {
      return undefined;
    } else {
      const todosObj = todosObject[todaysDate];
      const unsortedList = [];

      Object.keys(todosObj).forEach(key => {
        unsortedList.push({todoId: key, ...todosObj[key]});
      });

      const sortedTodosList = unsortedList.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : (a.timestamp < b.timestamp) ? -1 : 0);
      
      return sortedTodosList;
    }
  }
);

export const selectPercentage = createSelector(
  [selectTodosObject, (state, currentDate) => currentDate],
  (todosObject, currentDate) => {
    if (!todosObject || !todosObject[currentDate]) {
      return undefined;
    } else {
      if (Object.keys(todosObject[currentDate]).length) {
        const totalCount = Object.keys(todosObject[currentDate]).length;
        const totalComplete = Object.values(todosObject[currentDate])
          .filter(todo => todo.isComplete === true).length;
        const percentageComplete = Math.round((totalComplete / totalCount) * 100);
        return percentageComplete;
      } else {
        return undefined;
      }
    }
  }
);

export const { setTodosObject } = todosSlice.actions;

export default todosSlice.reducer;
