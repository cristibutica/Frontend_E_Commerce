import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import api from '../api/location';

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {

    const firstAndLastNameRegex = /^[A-Z][a-z]{2,23}$/;
    const userRegex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const registerURL = '/register'

    const [token, setToken] = useState(localStorage.getItem('token') || null );

    const [isAuth, setIsAuth] = useState(false);

    const [displayInfoBox, setDisplayInfoBox] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const [user, setUser] = useState('');

    const [password, setPassword] = useState('');

    const userRef = useRef();
    const [validUser, setValidUser] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [validPassword, setValidPassword] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatchPassword, setValidMatchPassword] = useState(false);

    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedRegionCode, setSelectedRegionCode] = useState('');

    const [selectedCity, setSelectedCity] = useState('');

    // month apparently starts from 0 so pay attention
    // $D, $M, $y
    const [date, setDate] = useState(null);

    const navigate = useNavigate();

    const fetchRegions = async () => {
        try {
            const response = await api.get(`judete`);
            setRegions(response.data);
            console.log(regions);

        } catch (err) {
            if (err.response) {
                console.log(`Error: ${err.response.data}`);
            } else {
                console.log(`Error: ${err.message}`);
            }
        }
    }

    useEffect(() => {

        const handleAuthentication = () => {

            if (token) {
                console.log(token);

                const decodedToken = jwtDecode(token);
                console.log(decodedToken);

                const currentTime = Date.now();
                console.log(currentTime);

                const tokenExpTime = decodedToken.exp * 1000;

                console.log(tokenExpTime);

                if (currentTime > tokenExpTime) {
                    setIsAuth(false);
                    localStorage.removeItem('token');
                    setToken("");
                } else {
                    setIsAuth(true);
                }
            } else {
                setIsAuth(false);
                setToken("");

               
            }

        }

        handleAuthentication();

    }, [token]);


    return (
        <GlobalContext.Provider value={{
            token, setToken, isAuth, setIsAuth, displayInfoBox, setDisplayInfoBox, errMsg, setErrMsg, userRef, user, setUser, validUser, setValidUser, firstName, setFirstName, validFirstName, setValidFirstName, lastName, setLastName, validLastName, setValidLastName, email, setEmail, validEmail, setValidEmail, password, setPassword, validPassword, setValidPassword, matchPassword, setMatchPassword, validMatchPassword, setValidMatchPassword, regions, setRegions, selectedRegion, setSelectedRegion
            , selectedRegionCode, setSelectedRegionCode, selectedCity, setSelectedCity, date, setDate, navigate, userRegex, firstAndLastNameRegex, emailRegex, passwordRegex, registerURL,fetchRegions
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext;