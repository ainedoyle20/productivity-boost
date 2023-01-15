import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addUserId } from "../features/user/userSlice";
import { registerUser } from "../app/firebase";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate("/todos");
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
    <div>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor='email'>Email</label>
        <input 
          id="email"
          type="text"
          name="email"
          value={formInfo.email}
          onChange={(e) => onInputChanged(e)}
          required
        />

        <label htmlFor='password'>Password</label>
        <input 
          id="password"
          type="password"
          name="password"
          value={formInfo.password}
          onChange={(e) => onInputChanged(e)}
          required
        />

        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input 
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={formInfo.confirmPassword}
          onChange={(e) => onInputChanged(e)}
          required
        />

        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register;
