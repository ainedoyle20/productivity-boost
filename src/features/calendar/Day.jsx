import React from 'react'

const Day = ({ date }) => {
  return (
    <div 
      style={{
        border: "1px solid black",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <span
        style={{
          marginRight: "5px"
        }}
      >
        {date}
      </span>
    </div>
  )
}

export default Day;
