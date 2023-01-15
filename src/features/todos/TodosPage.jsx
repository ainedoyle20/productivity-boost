import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

import { selectUserId } from "../user/userSlice";
import { setTodosObject, selectCurrentTodos, selectTodosObject } from "../todos/todosSlice";
import { getTodos, updateTodos } from "../../app/firebase";

const TodosPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector(selectUserId);
  const todaysTodos = useSelector(state => 
    selectCurrentTodos(state, `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`)
  );
  console.log("todays todos: ", todaysTodos);

  const [todoInput, setTodoInput] = useState("");

  const fetchTodosAndStoreInRedux = async (id) => {
    const todosObject = await getTodos(id);
    dispatch(setTodosObject(todosObject));
  }

  useEffect(() => {
    if (!userId) {
      navigate("/");
    } else {
      fetchTodosAndStoreInRedux(userId);
    }
  }, [userId])

  const handleAddTodo = async () => {
    const uniqueId = uuidv4();
    const newTodoObject = {[uniqueId]: {description: todoInput, isComplete: false }};
    if (!todaysTodos) {
      await updateTodos(userId, newTodoObject);
      console.log("todos updated 1");
    } else {
      await updateTodos(userId, {...todaysTodos, ...newTodoObject});
      console.log("todos updated 2");
    }
  }

  if (!userId) {
    redirect("/");
  }

  return (
    <div>
      <span>Todos Page</span>
      <input 
        type="text"
        name="description"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <button type='button' onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}

export default TodosPage;
