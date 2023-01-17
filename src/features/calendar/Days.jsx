import React from 'react';

import Day from './Day';

const Days = ({ days }) => {
  return (
    <div 
      style={{ 
        border: '1px solid black', 
        width: "600px",
        height: "500px", 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr",
      }}
    >
      {
        days.map((space, idx) => (
          <Day key={idx} date={idx + 1} />
        ))
      }
    </div>
  )
}

export default Days;
