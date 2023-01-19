import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";

import { selectUserId } from "../features/user/userSlice";

import Login from "./Login";
import Register from "./Register";

import styles from "./AuthPage.module.css";

const AuthPage = () => {
  const navigate = useNavigate();

  const userId = useSelector(selectUserId);

  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {

    if (userId) {
      navigate("/todos");
    }

  }, [userId]);

  return (
    <>
      <div className={styles.backToLanding} onClick={() => navigate("/")}>
        <BiArrowBack />
      </div>

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
    </>
    
  )
}

export default AuthPage;
