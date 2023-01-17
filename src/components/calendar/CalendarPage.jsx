import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectUserId } from "../../features/user/userSlice";

import { getDaysInMonth } from "../../app/utils";

import Header from './Header';
import Weekdays from './Weekdays';
import Days from './Days';
import CalendarModal from './CalendarModal';

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
    const paddingDays = 5;
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
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <Header monthYear={monthYear} setMonthYear={setMonthYear} />

      <Weekdays />

      <Days days={days} monthYear={monthYear} setScheduleModal={setScheduleModal} />

      {scheduleModal.showModal ? (
        <CalendarModal date={scheduleModal.date} setScheduleModal={setScheduleModal} />
      ) : null}
    </div>
  );
}

export default CalendarPage;