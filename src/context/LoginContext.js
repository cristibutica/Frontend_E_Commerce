import { createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

const LoginContext = createContext({});

export const LoginProvider = ({ children }) => {

    const [user, setUser] = useState('');

    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    return (
        <LoginContext.Provider value={{
            user, setUser, password, setPassword, navigate}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext;