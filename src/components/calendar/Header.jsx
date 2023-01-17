import React from 'react';

import { months } from "../../app/utils";

const Header = ({ monthYear, setMonthYear }) => {
  const decreaseMonth = () => {
    const { month, year } = monthYear;

    if (month === 0) {
      setMonthYear({ month: 11, year: (year - 1)});
    } else {
      setMonthYear({ month: (month - 1), year });
    }
  }

  const increaseMonth = () => {
    const { month, year } = monthYear;

    if (month === 11) {
      setMonthYear({ month: 0, year: (year + 1)});
    } else {
      setMonthYear({ month: (month + 1), year });
    }
  }

  return (
    <div style={{ border: "1px solid black", fontSize: "30px", display: "flex", justifyContent: "space-between", alignItems: "center", width: "500px", marginBottom: "40px"}}>
      <span onClick={decreaseMonth} style={{ cursor: "pointer"}}>Prev</span>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "240px" }}>
        <span>{months[monthYear.month]}</span>
        <span>{monthYear.year}</span>
      </div>

      <span onClick={increaseMonth} style={{ cursor: "pointer"}}>Next</span>
    </div>
  );
}

export default Header;
