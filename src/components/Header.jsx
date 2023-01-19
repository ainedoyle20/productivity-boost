import React from 'react';
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

import { months } from "../app/utils";

import styles from "./Header.module.css";

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
    <div className={styles.header}>
      <span onClick={decreaseMonth} className={styles.headerButtons}>
      <MdOutlineNavigateBefore />
      </span>

      <div className={styles.headerMonthYear}>
        <span>{months[monthYear.month]}</span>
        <span>{monthYear.year}</span>
      </div>

      <span onClick={increaseMonth} className={styles.headerButtons}>
        <MdOutlineNavigateNext />
      </span>
    </div>
  );
}

export default Header;
