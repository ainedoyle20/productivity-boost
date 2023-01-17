import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectUserId } from "../features/user/userSlice";

import Login from "./Login";
import Register from "./Register";

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
    <>
      <div>
        <button type='button' onClick={() => setShowLogin(true)}>Login</button>
        <button type='button' onClick={() => setShowLogin(false)}>Register</button>
      </div>
      {showLogin ? (
        <Login />
      ) : (
        <Register />
      )}
    </>
  )
}

export default AuthPage;
