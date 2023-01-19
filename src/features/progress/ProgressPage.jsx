import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Bar} from "react-chartjs-2";
import { Chart } from 'chart.js/auto';

import { fetchProgressData, selectChartData } from "./progressSlice";
import { selectUserId } from "../user/userSlice";

import Header from '../../components/Header';

import styles from "./ProgressPage.module.css";

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
          color: "#49fb35"
        },
        border: {
          color: "#49fb35",
          width: 2,
        },
        grid: {
          color: "#49fb35",
          display: false
        }
      },
      x: {
        border: {
          color: "#49fb35",
          width: 2,
        },
        grid: {
          color: "#49fb35",
          display: false
        },
        ticks: {
          color: "#49fb35"
        }
      },
    },
    plugins: {
      title: {
        display: true,
        text: chart === "day" ? "Daily Scores" : chart === "week" ? "Average Weekly Score" : "Average Score for the Month",
        color: "#49fb35"
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
        backgroundColor: "#49fb35",
        borderColor: "#49fb35",
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className={styles.container}>
      {!chartData ? (
          <div className={styles.nodata}>
            <span>No data </span>
            <span className={styles.nodataDescription}>You did not use this application during this month.</span> 
          </div>
      ) : null
      }

      {chartData 
        ? chartData.yAxis.reduce((acc, val) => acc + val, 0) === 0 
          ? (
            <div className={styles.nodata}>
              <span>0%</span>
              <span className={styles.nodataDescription}>You have not completed any of your todos.</span> 
            </div>
          ) 
          : null 
        : null
      }

      <Header monthYear={monthYear} setMonthYear={setMonthYear}  /> 

      <div className={styles.options}>
        <span
          onClick={() => setChart("day")}
          className={`${styles.option} ${styles.day} ${chart === "day" ? styles.activeOption : ""}`}
        >
          Day
        </span>
        <span
          onClick={() => setChart("week")}
          className={`${styles.option} ${chart === "week" ? styles.activeOption : ""}`}
        >
          Week
        </span>
        <span
          onClick={() => setChart("month")}
          className={`${styles.option} ${styles.month} ${chart === "month" ? styles.activeOption : ""}`}
        >
          Month
        </span>
      </div>
      
      
        <Bar 
          className={styles.barchart}
          data={chartDataObject}
          options={optionsObject}
        />
      
    </div>
  );
}

export default ProgressPage;
