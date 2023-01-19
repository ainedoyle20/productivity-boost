import React from 'react';

import styles from "./Calendar.module.css";

const Day = ({ date, hasTodos, selectDay }) => {

  return (
    <div 
      onClick={() => selectDay(date)}
      className={`${styles.day} ${date ? "" : styles.paddingDay}`}
    >
      <span className={styles.dayDate}>
        {date ? date : null}
      </span>

      {hasTodos ? (
        <div className={styles.hasTodos} />
      ) : null}
    </div>
  )
}

export default Day;
