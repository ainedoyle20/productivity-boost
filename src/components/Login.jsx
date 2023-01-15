import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addUserId } from "../features/user/userSlice";
import { loginUser } from "../app/firebase";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        navigate("/todos");
      }
    } catch (error) {
      console.log("Error logging in.");
    }
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor='email'>Email</label>
        <input 
          id="email"
          name="email"
          type="email"
          value={loginInfo.email}
          onChange={(e) => onLoginInfoChanged(e)}
          required
        />

        <label htmlFor='password'>Password</label>
        <input 
          id="password"
          name="password"
          type="password"
          value={loginInfo.password}
          onChange={(e) => onLoginInfoChanged(e)}
          required
        />

        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login;
