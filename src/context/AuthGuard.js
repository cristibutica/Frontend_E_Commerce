import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import GlobalContext from './GlobalContext';

const AuthGuard = ({ children }) => {
    const {isAuth} = useContext(GlobalContext);
    if(!isAuth)
        return <Navigate to='/login' />
    return children;
}

export default AuthGuard;