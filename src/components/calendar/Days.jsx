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
    <div className={styles.days}>
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
            isToday={new Date(`${monthYear?.year}-${monthYear?.month + 1}-${day}`).toDateString() === new Date().toDateString() ? true : false}
          />
        ))
      }
    </div>
  )
}

export default Days;
