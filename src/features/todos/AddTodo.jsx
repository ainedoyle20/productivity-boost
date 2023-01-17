import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

import styles from "./TodosPage.module.css";

const AddTodo = ({ handleAddTodo, inSchedule, isPastDate }) => {
  const [todoInput, setTodoInput] = useState("");

  if (inSchedule && isPastDate) {
    return null;
  }

  return (
    <div className={styles.addTodoContainer}>
      <input 
        type="text"
        name="description"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <button type='button' 
        onClick={() => 
          handleAddTodo({[uuidv4()]: {description: todoInput, isComplete: false, timestamp: Date.now() }})
        }
      >
        Add Todo
      </button>
    </div>
  );
}

export default AddTodo;
