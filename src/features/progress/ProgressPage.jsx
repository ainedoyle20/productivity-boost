import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Bar} from "react-chartjs-2";
import { Chart } from 'chart.js/auto';

import { fetchProgressData, selectChartData } from "./progressSlice";
import { selectUserId } from "../user/userSlice";

import Header from '../../components/calendar/Header';

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

  return (
    <div style={{ width: "900px", height: "100vh", margin: "auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px", border: "1px solid black"}}>
      {!chartData ? (
          <div style={{ fontSize: "20px", position: "absolute", cursor: "default", display: "flex", alignItems: "center", flexDirection: "column"}}>
            <span>No data </span>
            <span>You did not use this application during this month.</span> 
          </div>
      ) : null
      }

      {chartData 
        ? chartData.yAxis.slice(0, chartData.length-1).reduce((acc, val) => acc + val, 0) === 0 
          ? (
            <div style={{ fontSize: "20px", position: "absolute", cursor: "default", display: "flex", alignItems: "center", flexDirection: "column"}}>
              <span>0%</span>
              <span>You have not completed any of your todos.</span> 
            </div>
          ) 
          : null 
        : null
      }

      <Header monthYear={monthYear} setMonthYear={setMonthYear}  /> 

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
