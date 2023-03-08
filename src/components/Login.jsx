import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Oval } from 'react-loader-spinner';

import { addUserId } from "../features/user/userSlice";
import { loginUser } from "../app/firebase";

import styles from "./Login.module.css";

const Login = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
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

    setLoading(true);

    const { email, password } = loginInfo;
  
    try {
      const userId = await loginUser(email, password);
      if (userId) {
        dispatch(addUserId(userId));
      }
    } catch (error) {
      console.log("Error logging in.");
    }

    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.userLoginDetails}>
        <span style={{ marginBottom: "10px"}}>Login info for user with 2 months of data</span>
        <span>john@gmail.com</span>
        <span>John12345</span>
      </div>

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
        

        <button disabled={loading} type='submit' className={styles.loginBtn}>
          {loading 
            ? <span className={styles.loader}>
                <Oval
                  height={20}
                  width={20}
                  color="#40d32f"
                  visible={true}
                  ariaLabel='oval-loading'
                  secondaryColor="#40d32f"
                  strokeWidth={6}
                  strokeWidthSecondary={6}
                />
              </span>
            : "Login"
          }
        </button>
      </form>
    </div>
  )
}

export default Login;
