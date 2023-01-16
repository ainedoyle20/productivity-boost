import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';

import { selectUserId } from "../user/userSlice";
import { 
  selectCurrentTodos, 
  selectTodosList, 
  fetchTodosFromFirebase, 
  updateFirebaseTodos, 
  selectPercentage 
} from "../todos/todosSlice";
import { updateProgress} from "../../app/firebase";

import AddTodo from './AddTodo';
import TodosList from './TodosList';

import styles from "./TodosPage.module.css";

const TodosPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [todaysDate] = useState(`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`);

  const userId = useSelector(selectUserId);
  const todaysTodos = useSelector(state => 
    selectCurrentTodos(state, todaysDate)
  );
  const todosList = useSelector(state => 
    selectTodosList(state, todaysDate)
  );
  const percentageComplete = useSelector(state => selectPercentage(state, todaysDate));

  useEffect(() => {
    if (!userId) {
      navigate("/");
    } else {
      dispatch(fetchTodosFromFirebase(userId));
    }
  }, [userId])

  useEffect(() => {
    if (percentageComplete === undefined) {
      return;
    } else {
      updateProgress(userId, percentageComplete);
    }
  }, [percentageComplete]);

  const handleAddTodo = (newTodoObject) => {
    if (!todaysTodos) {
      dispatch(updateFirebaseTodos({id: userId, todaysTodosObject: newTodoObject }));
    } else {
      dispatch(updateFirebaseTodos({id: userId, todaysTodosObject: {...todaysTodos, ...newTodoObject}}));
    }
  }

  const handleEditTodo = (todoId, updatedDescription) => {
    const updatedObject = {...todaysTodos, [todoId]: {...todaysTodos[todoId], description: updatedDescription}}
    dispatch(updateFirebaseTodos({id: userId, todaysTodosObject: updatedObject }));
  }

  const handleTodoStatus = (todoId) => {
    const updatedTodo = {...todaysTodos[todoId], isComplete: !todaysTodos[todoId].isComplete};
    const updatedObject = {...todaysTodos, [todoId]: {...updatedTodo}};
    dispatch(updateFirebaseTodos({id: userId, todaysTodosObject: updatedObject }))
  }

  const handleDeleteTodo = (todoId) => {
    const todoIds = Object.keys(todaysTodos).filter(id => id !== todoId);
    const updatedTodos = {};
    todoIds.forEach(id => updatedTodos[id] = todaysTodos[id]);
    dispatch(updateFirebaseTodos({id: userId, todaysTodosObject: updatedTodos }));
  }

  if (!userId) {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.scheduleContainer}>
        <AddTodo handleAddTodo={handleAddTodo} />
        <TodosList 
          todosList={todosList} 
          todaysTodos={todaysTodos} 
          handleTodoStatus={handleTodoStatus} 
          handleEditTodo={handleEditTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
      </div>
    </div>
  );
}

export default TodosPage;
