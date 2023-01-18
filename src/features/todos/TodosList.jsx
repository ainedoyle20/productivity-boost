import React from 'react';

import Todo from './Todo';

import styles from "./Todos.module.css";

const TodosList = ({ todosList, todaysTodos, handleTodoStatus, handleEditTodo, handleDeleteTodo, inSchedule, isPastDate }) => {
  return (
    <div className={styles.todosList}>
      {todaysTodos && todosList?.length ? (
        todosList.map((todo) => (
          <Todo 
            key={todo.todoId} 
            todo={todo} 
            handleTodoStatus={handleTodoStatus} 
            handleEditTodo={handleEditTodo}
            handleDeleteTodo={handleDeleteTodo}
            inSchedule={inSchedule}
            isPastDate={isPastDate}
          />
        ))
      ) : (
        <span>Nothing listed for today.</span>
      )}
    </div>
  );
}

export default TodosList;
