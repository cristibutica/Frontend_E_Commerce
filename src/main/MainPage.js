import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';

const MainPage = () => {

  const {isAuth} = useContext(GlobalContext);
  console.log(isAuth);
  
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
