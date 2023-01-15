import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { logoutUser } from "../app/firebase";
import { removeUserId } from "../features/user/userSlice";
import { setTodosObject } from "../features/todos/todosSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    console.log('logging out');
    await logoutUser();
    dispatch(removeUserId());
    dispatch(setTodosObject({}));
  }

  if (pathname !== "/todos" && pathname !== "/calendar" && pathname !== "/progress") {
    return null;
  }

  return (
    <div>
      <span>Sidebar</span>
      <span onClick={handleLogout}>Logout</span>
    </div>
  )
}

export default Sidebar;
