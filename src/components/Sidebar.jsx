import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { FaTasks } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { ImCalendar } from "react-icons/im";
import { BiLogOut } from "react-icons/bi";

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
        <Link to="/todos">
          <FaTasks />
        </Link>
        <Link to="/progress">
          <GiProgression />
        </Link>
        <Link to="/calendar">
          <ImCalendar />
        </Link>
      </div>
      <span 
        className={styles.logout}
        onClick={handleLogout}
      >
        <BiLogOut />
      </span>
    </div>
  )
}

export default Sidebar;
