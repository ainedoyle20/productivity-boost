import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectUserId } from "../user/userSlice";

import Header from './Header';
import Weekdays from './Weekdays';
import Days from './Days';

const CalendarPage = () => {
  const navigate = useNavigate();

  const userId = useSelector(selectUserId);

  const [monthYear, setMonthYear] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() });
  const [days, setDays] = useState([]);

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId])
  
  useEffect(() => {
    let temp = [];
    for (let i = 1; i <= 31; i++) {
      temp.push(i);
    }

    setDays(temp);
  }, [])

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <Header monthYear={monthYear} setMonthYear={setMonthYear} />

      <Weekdays />

      <Days days={days} />
    </div>
  );
}

export default CalendarPage;
