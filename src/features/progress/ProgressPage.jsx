import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Bar} from "react-chartjs-2";
import { Chart } from 'chart.js/auto';

import { fetchProgressData, selectChartData } from "./progressSlice";
import { selectUserId } from "../user/userSlice";

import { months } from "../../app/utils";


const ProgressPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector(selectUserId);

  const [chart, setChart] = useState("day");
  const [monthYear, setMonthYear] = useState({month: new Date().getMonth(), year: new Date().getFullYear() }); 

  const chartData = useSelector((state) => selectChartData(state, {
    currentMonthYear: `${monthYear.month}-${monthYear.year}`, 
    dataOption: chart 
  }));

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }

    console.log('running');
    dispatch(fetchProgressData(userId));
    
  }, [userId]);

  const optionsObject = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value, index, ticks) {
            return value + '%';
          },
          color: "white"
        },
        border: {
          color: "white",
          width: 2,
        },
        grid: {
          color: "white",
          display: false
        }
      },
      x: {
        border: {
          color: "white",
          width: 2,
        },
        grid: {
          color: "white",
          display: false
        },
        ticks: {
          color: "white"
        }
      },
    },
    plugins: {
      title: {
        display: true,
        text: chart === "day" ? "Daily Scores" : chart === "week" ? "Average Weekly Score" : "Average Score for the Month",
        color: "white"
      },
      legend: {
        display: false
      },
      
    }
  }
  
  const chartDataObject = {
    labels: chartData ? [...chartData.xAxis] : [undefined],
    datasets: [
      {
        label: "Score",
        data: chartData ? [...chartData.yAxis, 100] : [100],
        backgroundColor: "white",
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  }

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
    <div style={{ width: "900px", height: "100vh", margin: "auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px", border: "1px solid black"}}>
      {!chartData ? (
          <div style={{ fontSize: "20px", position: "absolute", cursor: "default", display: "flex", alignItems: "center", flexDirection: "column"}}>
            <span>No data </span>
            <span>You did not use this application during this month.</span> 
          </div>
      ) : null
      }

      <div style={{ width: "300px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "30px", border: "1px solid black" }}>
        <span onClick={decreaseMonth} style={{ fontSize: "14px", cursor: "pointer"}}>Prev</span>

        <div style={{ display: "flex", justifyContent: "space-between", border: "1px solid black", width: "140px"}}>
          <span>{months[monthYear.month]}</span>
          <span>{monthYear.year}</span>
        </div>

        <span onClick={increaseMonth} style={{ fontSize: "14px", cursor: "pointer"}}>Next</span>
      </div>

      <div style={{ display: "flex", width: "auto"}}>
        <span
          onClick={() => setChart("day")}
          style={{ 
            cursor: "pointer", width: "100px", padding: "2px 0px", border: "1px solid black",
            display: "flex", justifyContent: "center", alignItems: "center",
            fontSize: "14px"
          }}
        >
          Day
        </span>
        <span
          onClick={() => setChart("week")}
          style={{ 
            cursor: "pointer", width: "100px", padding: "2px 0px", border: "1px solid black",
            display: "flex", justifyContent: "center", alignItems: "center",
            fontSize: "14px"
          }}
        >
          Week
        </span>
        <span
          onClick={() => setChart("month")}
          style={{ 
            cursor: "pointer", width: "100px", padding: "2px 0px", border: "1px solid black",
            display: "flex", justifyContent: "center", alignItems: "center",
            fontSize: "14px"
          }}
        >
          Month
        </span>
      </div>
      
      <Bar 
        data={chartDataObject}
        options={optionsObject}
      />
    </div>
  );
}

export default ProgressPage;
