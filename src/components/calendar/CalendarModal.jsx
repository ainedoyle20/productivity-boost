import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectTodosList, selectCurrentTodos, scheduleFirebaseTodos } from "../../features/todos/todosSlice";

import { 
  formatDateForPastCheck, 
  checkIfInPast, 
  getDateMonthYear,
  getDayOfWeek,
  getFullMonth
} from "../../app/utils";

import TodosList from '../../features/todos/TodosList';
import AddTodo from '../../features/todos/AddTodo';

import styles from "./Calendar.module.css";

const CalendarModal = ({ date, setScheduleModal, userId, monthYear }) => {
  const dispatch = useDispatch();

  const currentDateTodosObject = useSelector((state) => selectCurrentTodos(state, date));
  const todosList = useSelector((state) => selectTodosList(state, date));

  const [isPastDate, setIsPastDate] = useState(false);
  const [dayOfWeek, setDayOfWeek] = useState(null);
  const [fullMonth, setFullMonth] = useState(null);

  useEffect(() => {
    // Checking if date selected is past date
    // if isPastDate, then there won't be an option to edit todos listed
    const { day, month , year } = getDateMonthYear(date);

    const formattedDate = formatDateForPastCheck(day, month, year);
    const inPast = checkIfInPast(formattedDate);

    setIsPastDate(inPast);
  }, [])

  useEffect(() => {
    // Getting month string
    const monthString = getFullMonth(monthYear?.month);
    setFullMonth(monthString);

    // Getting day of week
    const weekDay = getDayOfWeek(date);
    setDayOfWeek(weekDay);
  }, [])

  const closeModal = () => {
    setScheduleModal({ 
      showModal: false, 
      date: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`, 
      todosObject: {},
    });
  }

  const handleAddTodo = (newTodoObject) => {
    if (!currentDateTodosObject) {
      dispatch(scheduleFirebaseTodos({id: userId, scheduledTodosObject: newTodoObject, date }));
    } else {
      dispatch(scheduleFirebaseTodos({id: userId, scheduledTodosObject: {...currentDateTodosObject, ...newTodoObject}, date}));
    }
  }

  const handleEditTodo = (todoId, updatedDescription) => {
    const updatedObject = {...currentDateTodosObject, [todoId]: {...currentDateTodosObject[todoId], description: updatedDescription}}
    dispatch(scheduleFirebaseTodos({id: userId, scheduledTodosObject: updatedObject, date }));
  }

  const handleDeleteTodo = (todoId) => {
    const todoIds = Object.keys(currentDateTodosObject).filter(id => id !== todoId);
    const updatedTodos = {};
    todoIds.forEach(id => updatedTodos[id] = currentDateTodosObject[id]);
    dispatch(scheduleFirebaseTodos({id: userId, scheduledTodosObject: updatedTodos, date }));
  }

  return (
    <div className={styles.modalContainer}
      // style={{ 
      //   position: "absolute", 
      //   width: "100vw", 
      //   height: "100vh", 
      //   zIndex: 10, 
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center"
      // }}
    >

      <div className={styles.modal}
        // style={{
        //   backgroundColor: "gray",
        //   border: "2px solid black",
        //   display: "flex",
        //   flexDirection: "column",
        //   alignItems: "center",
        //   width: "600px",
        //   height: "600px",
        // }}
      >
        <div className={styles.modalHeading}
          style={{ 
            width: "100%", 
            border: "1px solid black", 
            display: "flex", 
            justifyContent: "space-between", 
            marginBottom: "30px",
            padding: "10px",
            fontSize: "15px"
          }}
        >
          <div className={styles.monthYearDisplay}
          // style={{ display: "flex", gap: "10px" }}
          >
            <span>{fullMonth}</span>
            <span>{monthYear?.year}</span>
          </div>
          <span onClick={closeModal} className={styles.closeModal}>
            Close
          </span>
        </div>

        <div className={styles.fullDayContainer}>
          <span>{dayOfWeek}</span>
        </div>

        <div className={styles.listedTodos}>
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

       
      </div>
      
    </div>
  );
}

export default CalendarModal;

