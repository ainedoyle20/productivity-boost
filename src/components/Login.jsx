import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";

import { addUserId } from "../features/user/userSlice";
import { loginUser } from "../app/firebase";

import styles from "./Login.module.css";

const Login = () => {
  const dispatch = useDispatch();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  const onLoginInfoChanged = (e) => {
    const { name, value} = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;
  
    try {
      const userId = await loginUser(email, password);
      if (userId) {
        dispatch(addUserId(userId));
      }
    } catch (error) {
      console.log("Error logging in.");
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleOnSubmit} className={styles.loginForm}>
        
        <div className={styles.inputContainers}>
          <span>
            <TfiEmail />
          </span>
          <input 
            id="email"
            name="email"
            type="email"
            placeholder='Email'
            value={loginInfo.email}
            onChange={(e) => onLoginInfoChanged(e)}
            required
          />
        </div>

        <div className={styles.inputContainers}>
          <span>
            <RiLockPasswordLine />
          </span>
          <input 
            id="password"
            name="password"
            type="password"
            placeholder='Password'
            value={loginInfo.password}
            onChange={(e) => onLoginInfoChanged(e)}
            required
          />
        </div>
        

        <button type='submit' className={styles.loginBtn}>Login</button>
      </form>
    </div>
  )
}

export default Login;
