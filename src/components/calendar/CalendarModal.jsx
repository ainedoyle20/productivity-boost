import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectTodosList, selectCurrentTodos, scheduleFirebaseTodos } from "../../features/todos/todosSlice";

import { formatDateForPastCheck, checkIfInPast, addTodo } from "../../app/utils";

import TodosList from '../../features/todos/TodosList';
import AddTodo from '../../features/todos/AddTodo';

const CalendarModal = ({ date, setScheduleModal, userId }) => {
  const dispatch = useDispatch();

  const currentDateTodosObject = useSelector((state) => selectCurrentTodos(state, date));
  const todosList = useSelector((state) => selectTodosList(state, date));

  const [isPastDate, setIsPastDate] = useState(false);

  useEffect(() => {
    // Checking if date selected is past date
    // if isPastDate, then there won't be an option to edit todos listed
    const splitDate = date.split("-");
    const day = Number(splitDate[0]);
    const month = Number(splitDate[1]);
    const year = Number(splitDate[2]);

    const formattedDate = formatDateForPastCheck(day, month, year);
    const inPast = checkIfInPast(formattedDate);

    setIsPastDate(inPast);
  }, [])

  const closeModal = () => {
    setScheduleModal({ 
      showModal: false, 
      date: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`, 
      todosObject: {},
    });
  }

  const handleAddTodo = (newTodo) => {
    addTodo(newTodo, currentDateTodosObject, userId, dispatch, date, scheduleFirebaseTodos);
  }

  const handleEditTodo = () => {
    console.log("edit");
  }
  const handleDeleteTodo = () => {
    console.log("delete");
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
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div 
        style={{ 
          width: "100%", 
          border: "1px solid black", 
          display: "flex", 
          justifyContent: "flex-end", 
          marginBottom: "30px",
          padding: "10px"
        }}
      >
        <span onClick={closeModal} style={{ fontSize: "20px", cursor: "pointer"}}>
          Close
        </span>
      </div>

      <AddTodo 
        handleAddTodo={handleAddTodo}
        inSchedule={true} 
        isPastDate={isPastDate}
      />
      <TodosList 
        todosList={todosList} 
        todaysTodos={currentDateTodosObject} 
        handleEditTodo={handleEditTodo} 
        handleDeleteTodo={handleDeleteTodo}
        inSchedule={true} 
        isPastDate={isPastDate}
      />
    </div>
  );
}

export default CalendarModal;

