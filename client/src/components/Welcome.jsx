import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className='welcome'>
      <h1>Welcome the the User Database!</h1>
      <Link to='/signup'><button>Sign Up</button></Link>
      <Link to='/login'><button>Log In</button></Link>
    </div>
  )
};

export default Welcome;