import React, {useState} from 'react';
import { CiSettings } from "react-icons/ci";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"

import EditTodo from './EditTodo';

import styles from "./Todos.module.css";

const Todo = ({ todo: { description, isComplete, todoId }, handleTodoStatus, handleEditTodo, handleDeleteTodo, inSchedule, isPastDate}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showOptions, setShowOptions] = useState(false);


  return (
    <div className={styles.todo}>
      {!inSchedule ? (
        <span 
          className={styles.status}
          onClick={() => handleTodoStatus(todoId)}
        >
          {isComplete ? "√" : ""}
        </span>
      ) : null}

      {showEdit ? (
        <EditTodo initialDescription={description} setShowEdit={setShowEdit} handleEditTodo={handleEditTodo} todoId={todoId} />
      ) : (
        <>
          <p className={styles.description}>{description}</p>
          
          {!inSchedule || (inSchedule && !isPastDate) ? (
            <div className={`${styles.settings} ${showOptions ? styles.optionsShown : ""}`}>
              <span 
                className={`${styles.settingsIconContainer} ${showOptions ? styles.rotateIcon : ""}`} 
                onClick={() => setShowOptions(prev => !prev)}
              >
                <CiSettings className={styles.settingsIcon} />
              </span>
              <div className={styles.options}>
                <span onClick={() => {
                  setShowEdit(true);
                  setShowOptions(false);
                }}>
                  <AiOutlineEdit />
                </span>
                <span 
                  onClick={() => {
                    handleDeleteTodo(todoId);
                  }}
                >
                  <AiOutlineDelete />
                </span>
              </div>
            </div>
          ) 
          : null
          }
        </>
      )}
    </div>
  )
}

export default Todo;
