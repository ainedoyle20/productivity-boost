import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RiLockPasswordLine } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";

import { addUserId } from "../features/user/userSlice";
import { registerUser } from "../app/firebase";

import styles from "./Register.module.css";

const Register = () => {
  const dispatch = useDispatch();

  const [formInfo, setFormInfo] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const onInputChanged = (e) => {
    const { name, value } = e.target;
    setFormInfo({ ...formInfo, [name]: value });
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formInfo;
    console.log("formInfo: ", email, password, confirmPassword);

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      const userId = await registerUser(email, password);
      dispatch(addUserId(userId));
    } catch (error) {
      console.log("Error registering user.");
    }

    setFormInfo({
      email: "",
      password: "",
      confirmPassword: ""
    });
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleOnSubmit} className={styles.registerForm}>

        <div className={styles.inputContainers}>
          <span>
            <TfiEmail />
          </span>
          <input 
            type="text"
            name="email"
            placeholder='Email'
            value={formInfo.email}
            onChange={(e) => onInputChanged(e)}
            required
          />
        </div>

        <div className={styles.inputContainers}>
          <span>
            <RiLockPasswordLine />
          </span>
          <input 
            type="password"
            name="password"
            placeholder='Password'
            value={formInfo.password}
            onChange={(e) => onInputChanged(e)}
            required
          />
        </div>

        <div className={styles.inputContainers}>
          <span>
            <RiLockPasswordLine />
          </span>
          <input 
            type="password"
            name="confirmPassword"
            placeholder='Confirm Password'
            value={formInfo.confirmPassword}
            onChange={(e) => onInputChanged(e)}
            required
          />
        </div>

        <button type='submit' className={styles.registerBtn}>Register</button>
      </form>
    </div>
  )
}

export default Register;
