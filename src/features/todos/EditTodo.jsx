import React, { useState } from 'react';

import styles from "./Todos.module.css";

const EditTodo = ({ initialDescription, setShowEdit, handleEditTodo, todoId }) => {
  const [editInfo, setEditInfo] = useState(`${initialDescription}`);

  const handleOnChanged = (e) => setEditInfo(e.target.value);

  return (
    <>
      <div className={styles.editContainer}>
        <textarea 
          className={styles.editTextarea}
          value={editInfo}
          onChange={(e) => handleOnChanged(e)}
        />
      </div>
      <div>
        <button type="button" onClick={() => {
          handleEditTodo(todoId, editInfo);
          setShowEdit(false);
        }}>
          Edit
        </button>
      </div>
    </>
  );
}

export default EditTodo;
