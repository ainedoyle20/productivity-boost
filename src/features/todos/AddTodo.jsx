import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import {IoMdAddCircleOutline} from "react-icons/io";

import styles from "./Todos.module.css";

const AddTodo = ({ handleAddTodo, inSchedule, isPastDate }) => {
  const [todoInput, setTodoInput] = useState("");

  if (inSchedule && isPastDate) {
    return null;
  }

  return (
    <div className={styles.addTodoContainer}>
      <textarea 
        className={styles.addTodoInput}
        type="text"
        name="description"
        placeholder='Add Task'
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <span 
        className={styles.addTodoBtn}
        onClick={() => 
          handleAddTodo({[uuidv4()]: {description: todoInput, isComplete: false, timestamp: Date.now() }})
        }
      >
        <IoMdAddCircleOutline />
      </span>
    </div>
  );
}

export default AddTodo;
