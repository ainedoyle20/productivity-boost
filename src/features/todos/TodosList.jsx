import React from 'react';

import Todo from './Todo';

import styles from "./TodosPage.module.css";

const TodosList = ({ todosList, todaysTodos, handleTodoStatus, handleEditTodo, handleDeleteTodo }) => {
  return (
    <div className={styles.todosList}>
      {todaysTodos ? (
        todosList.map((todo) => (
          <Todo 
            key={todo.todoId} 
            todo={todo} 
            handleTodoStatus={handleTodoStatus} 
            handleEditTodo={handleEditTodo}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))
      ) : (
        <span>Nothing listed for today.</span>
      )}
    </div>
  );
}

export default TodosList;
