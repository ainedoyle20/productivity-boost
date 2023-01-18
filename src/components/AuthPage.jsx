import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectUserId } from "../features/user/userSlice";

import Login from "./Login";
import Register from "./Register";

import styles from "./AuthPage.module.css";

const AuthPage = () => {
  const navigate = useNavigate();

  const userId = useSelector(selectUserId);

  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    // check if userId
    // if userId -> redirect to /todos

    console.log("userId: ", userId);

    if (userId) {
      navigate("/todos");
    }

    // do NOT add userId as dependency
    // only want to check on arriving to page
    // redirecting after logging in will be handled in function
  }, [userId]);

  return (
    <div className={styles.container}>
      <div className={`${styles.toggles} ${showLogin ? styles.showLogin : styles.showRegister}`}>
        <span onClick={() => setShowLogin(true)} className={styles.toggleLogin}>Login</span>
        <span onClick={() => setShowLogin(false)} className={styles.toggleRegister}>Register</span>
      </div>
      {showLogin ? (
        <Login />
      ) : (
        <Register />
      )}
    </div>
  )
}

export default AuthPage;
