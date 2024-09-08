import React from 'react';
import {Link} from 'react-router-dom';

const MainPage = () => {
  return (
    <form>
      <h2>This is the main page</h2>
      <ul>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </ul>
    </form>
  )
}

export default MainPage
