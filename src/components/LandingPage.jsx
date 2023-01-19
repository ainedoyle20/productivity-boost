import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUserId } from "../features/user/userSlice";

import ProductivityIcon from "../assets/productivity-icon.svg";

import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const instructionsRef = useRef();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    if (userId) {
      navigate("/todos");
    }
  
  }, []);

  const executeScroll = () => instructionsRef.current.scrollIntoView()

  return (
    <>
      <div className={styles.links}>
        <Link to="/auth">
          Login / Register
        </Link>
      </div>

      <div className={styles.iconContainer}>
        <img 
          className={styles.icon}
          alt="productivity icon"
          src={ProductivityIcon}
        />
      </div>

      <div className={styles.textContainer}>
        <div className={styles.text1}>
          <span>Boost</span>
          <span>Your</span>
        </div>
        <div className={styles.text2}>
          <span>
            Productivity!
          </span>
        </div>  
      </div>

      <div className={styles.button} onClick={executeScroll}>
        Simple Steps to Get Started
      </div>
      
      <div className={styles.instructions} ref={instructionsRef}>
        <div className={styles.instruction}>
          <span className={styles.step}>Step 1</span>
          <span className={styles.stepDescription}>Register or Login to access your data.</span>
        </div>
        <div className={styles.instruction}>
          <span className={styles.step}>Step 2</span>
          <span className={styles.stepDescription}>Add and complete your todos for today or schedule future todos at Schedule.</span>
        </div>
        <div className={styles.instruction}>
          <span className={styles.step}>Step 3</span>
          <span className={styles.stepDescription}>Track your productivity at Progress!</span>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
