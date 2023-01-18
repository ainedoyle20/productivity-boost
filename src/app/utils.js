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

export const formatDateForPastCheck = (date, month, year) => {
  return `${year}-${month + 1}-${date}`;
}

export const getFirstDayOfMonth = (year, month) => {
  const dateString = new Date(year, month, 1).toString();
  const firstDayPartial = dateString.split(" ")[0];
  let fullFirstDay;
  weekdays.forEach(wkday => wkday.includes(firstDayPartial) ? fullFirstDay = wkday : wkday);
  return fullFirstDay;
}

export const getPaddingDays = (year, month) => {
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const indexOfFirstDay = weekdays.indexOf(firstDayOfMonth);
  return indexOfFirstDay;
}

export const getDateMonthYear = (date) => {
  const splitDate = date.split("-");
  const day = Number(splitDate[0]);
  const month = Number(splitDate[1]);
  const year = Number(splitDate[2]);
  return { day, month, year };
}

export const getFullMonth = (month) => {
  if (month === undefined || month === null) return null;
  
  return months[month];
}

export const getDayOfWeek = (date) => {
  const { day, month, year } = getDateMonthYear(date);

  const currentday = new Date(`${year}-${month + 1}-${day}`).getDay();

  if (currentday === 0) {
    return "Sunday";
  } else {
    const dayOfWeek = weekdays[currentday - 1];

    return dayOfWeek;
  }
}

export const checkIfInPast = (formattedDate) => {
  const today = new Date();
  const dateEntered = new Date(formattedDate);

  // Setting the hour of todays date to midnight
  // so the comparison only returns `true` if the passed-in date
  // is at least yesterday
  today.setHours(0, 0, 0, 0);

  return dateEntered < today;
}

// todo functions
export const addTodo = (newTodo, currentDateTodosObject, userId, dispatch, date, reduxFunc) => {
  if (!currentDateTodosObject) {
    dispatch(reduxFunc({id: userId, scheduledTodosObject: newTodo, date }));
  } else {
    dispatch(reduxFunc({id: userId, scheduledTodosObject: {...currentDateTodosObject, ...newTodo}, date }));
  }
}

export const editTodo = (userId, todoId, updatedDescription, todaysTodos, dispatch, reduxFunc, date) => {
  const updatedObject = {...todaysTodos, [todoId]: {...todaysTodos[todoId], description: updatedDescription}}
  dispatch(reduxFunc({id: userId, todaysTodosObject: updatedObject, date }));
}

export const deleteTodo = (userId, todoId, todaysTodos, dispatch, reduxFunc, date ) => {
  const todoIds = Object.keys(todaysTodos).filter(id => id !== todoId);
  const updatedTodos = {};
  todoIds.forEach(id => updatedTodos[id] = todaysTodos[id]);
  dispatch(reduxFunc({id: userId, todaysTodosObject: updatedTodos, date }));
}
