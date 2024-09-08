import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

   const [token, setToken] = useState('');

   const [isAuth, setIsAuth] = useState(false);

    return (
        <AuthContext.Provider value={{
           token, setToken, isAuth, setIsAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;