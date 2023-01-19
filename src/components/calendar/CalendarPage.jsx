import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectUserId } from "../../features/user/userSlice";

import { getDaysInMonth, getPaddingDays } from "../../app/utils";

import Header from '../Header';
import Weekdays from './Weekdays';
import Days from './Days';
import CalendarModal from './CalendarModal';

import styles from "./Calendar.module.css";

const CalendarPage = () => {
  const navigate = useNavigate();

  const userId = useSelector(selectUserId);

  const [monthYear, setMonthYear] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() });
  const [days, setDays] = useState([]);
  const [scheduleModal, setScheduleModal] = useState({ 
    showModal: false, 
    date: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`
  });

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId])
  
  useEffect(() => {
    console.log("Running.");

    let temp = [];
    const paddingDays = getPaddingDays(monthYear.year, monthYear.month);
    const daysInMonth = getDaysInMonth((monthYear.month + 1), monthYear.year);

    let i = 1;
    while (i <= (daysInMonth + paddingDays)) {
      if (i <= paddingDays) {
        temp.push(undefined);
        i++;
      } else {
        temp.push(i - paddingDays);
        i++;
      }
    }

    setDays(temp);
  }, [monthYear])

  return (
    <div className={styles.calendarPage}>
      <Header monthYear={monthYear} setMonthYear={setMonthYear} />

      <Weekdays />

      <Days days={days} monthYear={monthYear} setScheduleModal={setScheduleModal} />

      {scheduleModal.showModal ? (
        <CalendarModal 
          date={scheduleModal.date} 
          setScheduleModal={setScheduleModal} 
          userId={userId} 
          monthYear={monthYear}
        />
      ) : null}
    </div>
  );
}

export default CalendarPage;
