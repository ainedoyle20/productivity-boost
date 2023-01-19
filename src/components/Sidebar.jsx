import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { FaTasks } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { ImCalendar } from "react-icons/im";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

import { logoutUser } from "../app/firebase";
import { removeUserId } from "../features/user/userSlice";
import { setTodosObject } from "../features/todos/todosSlice";
import { setProgressObject } from "../features/progress/progressSlice";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = async () => {
    console.log('logging out');
    await logoutUser();
    dispatch(removeUserId());
    dispatch(setTodosObject({}));
    dispatch(setProgressObject({}));
    setShowSidebar(false);
  }

  if (pathname !== "/todos" && pathname !== "/calendar" && pathname !== "/progress") {
    return null;
  }

  return (
    <div className={`${styles.container} ${showSidebar ? styles.showSidebar : styles.hideSidebar }`}>
      <div className={styles.burger} onClick={() => setShowSidebar(true)}>
        <GiHamburgerMenu  />
      </div>

      <div className={styles.sidebar}>
        <div className={styles.close} onClick={() => setShowSidebar(false)}>
          <AiOutlineCloseCircle  />
        </div>

        <div className={styles.navs}>
          <Link to="/todos" className={styles.todosLink}>
            <FaTasks />
            <div className={styles.todosLinkName}>
              Todos
            </div>
          </Link>
          <Link to="/progress" className={styles.progressLink}>
            <GiProgression />
            <div className={styles.progressLinkName}>
              Progress
            </div>
          </Link>
          <Link to="/calendar" className={styles.calendarLink}>
            <ImCalendar />
            <div className={styles.calendarLinkName}>
              Calendar
            </div>
          </Link>
        </div>

        <span 
          className={styles.logoutSection}
          onClick={handleLogout}
        >
          <div className={styles.logout}>
            <BiLogOut />
            <div className={styles.logoutName}>
              Logout
            </div>
          </div>
        </span>
      </div> 

    </div>
  );
}

export default Sidebar;
