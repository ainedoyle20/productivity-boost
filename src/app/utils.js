export const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
}

const parseMonthYear = (currentMonthYear) => {
  const month = currentMonthYear.split("-")[0];
  const fullYear = currentMonthYear.split("-")[1];
  return { month: Number(month), fullYear: Number(fullYear) };
}

export const getDataPerDay = (datePercentageObject, currentMonthYear) => {
  const { month, fullYear } = parseMonthYear(currentMonthYear);
  const daysInMonth = getDaysInMonth((month + 1), fullYear);

  const xAxis = [];
  for (let i=1; i <= daysInMonth; i++) {
    xAxis.push(`${i}`);
  }

  const yAxis = [];
  xAxis.forEach(date => {
    if (!datePercentageObject[date]) {
      yAxis.push(undefined);
    } else {
      yAxis.push(datePercentageObject[date]);
    }
  })

  return { xAxis, yAxis };
}

export const getDataPerWeek = (datePercentageObject, currentMonthYear) => {
  const { month, fullYear } = parseMonthYear(currentMonthYear);
  const daysInMonth = getDaysInMonth((month + 1), fullYear);

  let xAxis;
  if (daysInMonth === 28) {
    xAxis = ["1-7", "8-14", "15-21", "22-28"];
  } else if (daysInMonth === 29) {
    xAxis = ["1-7", "8-14", "15-21", "22-29"];
  } else if (daysInMonth === 30) {
    xAxis = ["1-7", "8-14", "15-21", "22-28", "29-30"];
  } else {
    xAxis = ["1-7", "8-14", "15-21", "22-28", "29-31"];
  }

  let weeks = {};
  xAxis.forEach(wk => weeks[wk] = []);

  let i = 1;
  xAxis.forEach(wk => {
    while (i <= daysInMonth && weeks[wk].length < 7) {

      weeks[wk] = [...weeks[wk], datePercentageObject[i]];

      i++;
    }

    if (daysInMonth === 29 && wk === "22-29" && weeks[wk].length === 7) {
      weeks[wk] = [...weeks[wk], datePercentageObject[i]];
    }
  });

  
  // Function to get average score per week
  const getAverage = (arr) => {
    const removedUndefined = arr.filter(val => val);
   
    if (!removedUndefined.length) {
      return undefined;
    } else {
      const count = removedUndefined.length;
      const total = removedUndefined.reduce((acc, val) => acc + val, 0);
      return Math.round(total / count);
    }
  }

  // Createing a xAxisLabel-average object
  let averages = {};
  Object.keys(weeks).forEach((wk) => {
    averages[wk] = getAverage(weeks[wk]);
  });

  // Creating the yAxis values (corresponding to xAxis labels)
  const yAxis = [];
  Object.values(averages).forEach((val) => yAxis.push(val));

  return {xAxis, yAxis};
}

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


export const getDataPerMonth = (datePercentageObject, currentMonthYear) => {
  
  const { month } = parseMonthYear(currentMonthYear);

  const xAxis = [`${months[Number(month)]}`];

  const scores = Object.values(datePercentageObject);
  const totalCount = scores.length;
  const totalSum = scores.reduce((acc, val) => acc + val, 0);

  const yAxis = [Math.round(totalSum / totalCount)];

  return { xAxis, yAxis };
}
