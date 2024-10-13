import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import api from '../api/location';

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {

    const firstAndLastNameRegex = /^[A-Z][a-z]{2,23}$/;
    const userRegex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const registerURL = '/register'

    const [token, setToken] = useState(localStorage.getItem('token') || null);

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

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');

    // month apparently starts from 0 so pay attention
    // $D, $M, $y
    const [date, setDate] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
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
        fetchRegions();
    }, [selectedRegion])

    const fetchCities = async () => {
        if (selectedRegionCode) {
            try {
                const response = await api.get(`orase/${selectedRegionCode}`);
                setCities(response.data);
                console.log(cities);
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else {
                    console.log(`Error: ${err.message}`);
                }
            }
        }
    };

    useEffect(() => {
        const fetchCities = async () => {
            console.log(selectedRegionCode);

            if (selectedRegionCode) {
                try {
                    const response = await api.get(`orase/${selectedRegionCode}`);
                    setCities(response.data);
                    console.log(cities);
                } catch (err) {
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else {
                        console.log(`Error: ${err.message}`);
                    }
                }
            }
        };

        fetchCities();
    }, [selectedRegionCode]);

    useEffect(() => {
        const setRegionCode = () => {
            const selectedRegionObj = regions.find(region => region.nume === selectedRegion);

            if (selectedRegionObj) {
                setSelectedRegionCode(selectedRegionObj.auto);
            }
        }
        setRegionCode();
    }, [selectedRegion])

  

    useEffect(() => {
        const handleAuthentication = () => {
            if (token) {
                const { exp } = jwtDecode(token);

                const expirationTime = exp * 1000;
                const currentTime = Date.now();

                if (expirationTime > currentTime) {
                    setIsAuth(true);
                    localStorage.setItem("isAuth", true);
                    const timeUntilExpiration = expirationTime - currentTime;
                    const refreshTimeout = setTimeout(() => {
                        console.log("Aceess token has expired, refreshing...");
                        setIsAuth(false);
                        setToken(null);
                        localStorage.removeItem("token");
                        localStorage.removeItem("isAuth");
                    }, timeUntilExpiration - 60000);

                    return () => clearTimeout(refreshTimeout);
                } else {
                    console.log("Access token has expired");
                    setIsAuth(false);
                    setToken(null);
                    localStorage.removeItem("token");
                    localStorage.removeItem("isAuth");
                }
            } else {
                setIsAuth(false);
                localStorage.removeItem("isAuth");
            }
        };

        handleAuthentication();
    }, [token]);


    return (
        <GlobalContext.Provider value={{
            token, setToken, isAuth, setIsAuth, displayInfoBox, setDisplayInfoBox, errMsg, setErrMsg, userRef, user, setUser, validUser, setValidUser, firstName, setFirstName, validFirstName, setValidFirstName, lastName, setLastName, validLastName, setValidLastName, email, setEmail, validEmail, setValidEmail, password, setPassword, validPassword, setValidPassword, matchPassword, setMatchPassword, validMatchPassword, setValidMatchPassword, regions, setRegions, selectedRegion, setSelectedRegion
            , selectedRegionCode, setSelectedRegionCode, selectedCity, setSelectedCity, date, setDate, navigate, userRegex, firstAndLastNameRegex, emailRegex, passwordRegex, registerURL, cities
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext;