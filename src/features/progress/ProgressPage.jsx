import React from 'react';
import {Bar} from "react-chartjs-2";

const ProgressPage = () => {
  // have toggle buttons for: Day | Week | Month 
  // only add day-percentage to month object in firebase for days logged in
  // for days not used -> undefined, add to data array (see below comment)
  // undefined data will show gap in chart, better than have 0 for days not logged in

  const options = {
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
        text: 'Average Score',
        color: "white"
      },
      legend: {
        display: false
      },
      
    }
  }

  const chartData = {
    // labels: ["1-7", "8-14", "15-21", "22-28", "29-31"],
    labels: ["This Month"],
    datasets: [
      {
        label: "Score",
        // data: [80, 95, undefined, 70, 99],
        data: [80, 100],
        backgroundColor: "white",
        borderColor: "white",
        borderWidth: 1,
        tension: 0.2,
        
      },
    ],
  }

  return (
    <div style={{ width: "900px", height: "100vh", margin: "auto", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Bar 
        data={chartData}
        options={options}
      />
    </div>
  );
}

export default ProgressPage;
