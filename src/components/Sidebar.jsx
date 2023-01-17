import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

import { logoutUser } from "../app/firebase";
import { removeUserId } from "../features/user/userSlice";
import { setTodosObject } from "../features/todos/todosSlice";
import { setProgressObject } from "../features/progress/progressSlice";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    console.log('logging out');
    await logoutUser();
    dispatch(removeUserId());
    dispatch(setTodosObject({}));
    dispatch(setProgressObject({}));
  }

  if (pathname !== "/todos" && pathname !== "/calendar" && pathname !== "/progress") {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.navs}>
        <Link to="/todos">Todos</Link>
        <Link to="/progress">Progress</Link>
        <Link to="/calendar">Schedule</Link>
      </div>
      <span 
        className={styles.logout}
        onClick={handleLogout}
      >
        Logout
      </span>
    </div>
  )
}

export default Sidebar;
