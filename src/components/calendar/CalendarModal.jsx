import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectTodosList, selectCurrentTodos, scheduleFirebaseTodos } from "../../features/todos/todosSlice";

const CalendarModal = ({ date, setScheduleModal, userId }) => {
  const dispatch = useDispatch();

  const currentDateTodosObject = useSelector((state) => selectCurrentTodos(state, date));
  const todosList = useSelector((state) => selectTodosList(state, date));
  // console.log("todosList: ", todosList);

  const [tempList, setTempList] = useState(todosList ? [...todosList] : []);
  const [tempObject, setTempObject] = useState(currentDateTodosObject ? {...currentDateTodosObject} : {});

  const closeModal = () => {
    setScheduleModal({ 
      showModal: false, 
      date: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`, 
      todosObject: {},
    });
  }

  const scheduleTodos = () => {
    dispatch(scheduleFirebaseTodos({ id: userId, scheduledTodosObject: {tempObject}, date }));
    closeModal();
  }

  return (
    <div
      style={{ 
        position: "absolute", 
        width: "900px", 
        height: "700px", 
        backgroundColor: "gray", 
        zIndex: 10, 
        border: "2px solid black",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <span onClick={closeModal}>Calendar Modal</span>
    </div>
  );
}

export default CalendarModal;

