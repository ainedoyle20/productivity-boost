import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {

  useEffect(() => {
    // check if userId
    // if userId -> redirect to /todos
  
  }, []);
  

  return (
    <div>
      <div>
        <Link to="/auth">
          Login / Register
        </Link>
      </div>
      <div>
        <span>Boost</span>
        <span>Your</span>
      </div>
      <div>
        <span>
          Productivity
        </span>
      </div>
    </div>
  );
}

export default LandingPage;
