import React from 'react';
import { useSelector } from 'react-redux';

import { selectTodosObject } from "../../features/todos/todosSlice";

import Day from './Day';

import styles from "./Calendar.module.css";

const Days = ({ days, monthYear, setScheduleModal }) => {
  const todosObject = useSelector(selectTodosObject);

  const selectDay = (date) => {
    if (!date) return;

    const formatedDate = `${date}-${monthYear.month}-${monthYear.year}`;

    setScheduleModal({ showModal: true, date: formatedDate });
  }

  return (
    <div className={styles.days}
      // style={{ 
      //   border: '1px solid black', 
      //   width: "600px",
      //   height: "500px", 
      //   display: "grid", 
      //   gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
      //   gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr",
      // }}
    >
      {
        days.map((day, idx) => (
          <Day 
            key={idx} 
            date={day} 
            hasTodos={
              todosObject[`${day}-${monthYear.month}-${monthYear.year}`] ? (
                Object.keys(todosObject[`${day}-${monthYear.month}-${monthYear.year}`]).length ? true : false
              ) : false
            } 
            selectDay={selectDay}
          />
        ))
      }
    </div>
  )
}

export default Days;
