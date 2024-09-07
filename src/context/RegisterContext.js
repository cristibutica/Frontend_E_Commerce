import { createContext, useState, useEffect, useRef } from "react";

const RegisterContext = createContext({});

export const RegisterProvider = ({ children }) => {

    const userRef = useRef();
    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
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

    return (
        <RegisterContext.Provider value={{
            userRef, user, setUser, validUser, setValidUser, firstName, setFirstName, validFirstName, setValidFirstName, lastName, setLastName, validLastName, setValidLastName, email, setEmail, validEmail, setValidEmail, password, setPassword, validPassword, setValidPassword, matchPassword, setMatchPassword, validMatchPassword, setValidMatchPassword, regions, setRegions, selectedRegion, setSelectedRegion
            , selectedRegionCode, setSelectedRegionCode, selectedCity, setSelectedCity, date, setDate
        }}>
            {children}
        </RegisterContext.Provider>
    )
}

export default RegisterContext;