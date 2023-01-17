import React from 'react';

const Day = ({ date, hasTodos, selectDay }) => {

  return (
    <div 
      onClick={() => selectDay(date)}
      style={{
        border: "1px solid black",
        display: "flex",
        justifyContent: "flex-end",
        position: "relative",
        cursor: "pointer"
      }}
    >
      <span
        style={{
          marginRight: "5px"
        }}
      >
        {date ? date : null}
      </span>

      {hasTodos ? (
        <div 
          style={{ 
            width: "15px", height: "15px", borderRadius: "100%", backgroundColor: "lightblue",
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"
          }} 
        />
      ) : null}
    </div>
  )
}

export default Day;
