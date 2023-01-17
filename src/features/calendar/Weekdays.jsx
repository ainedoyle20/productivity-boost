import React from 'react';

import { weekdays } from "../../app/utils";

const Weekdays = () => {
  return (
    <div
      style={{ 
        border: '1px solid black', 
        borderBottom: "none",
        width: "600px", 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
      }}
    >
      {weekdays.map((day, idx) => 
        <span key={idx} style={{ fontSize: "12px", border: "1px solid black", display: "flex", justifyContent: "center"}}>
          {day}
        </span>
      )}
    </div>
  );
}

export default Weekdays;
