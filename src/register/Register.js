import React from 'react';
import { useRef, useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Alert from '@mui/material/Alert';
import UserField from './UserField';
import NameField from './NameField';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import RegionField from './RegionField'
import api from './api/location';
import axios from './api/axios'
import CityField from './CityField';
import MatchPasswordField from './MatchPasswordField';
import DateField from './DateField';

const firstAndLastNameRegex = /^[A-Z][a-z]{2,23}$/;
const userRegex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const registerURL = '/register'

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatchPwd, setValidMatchPwd] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedRegionCode, setSelectedRegionCode] = useState('');

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');

    // month apparently starts from 0 so pay attention
    // $D, $M, $y
    const [date, setDate] = useState(null);

    const [errMsg, setErrMsg] = useState('');
    const [succes, setSucces] = useState(false);
    const [displayInfoBox, setDisplayInfoBox] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidUser(userRegex.test(user));
    }, [user]);

    useEffect(() => {
        setValidFirstName(firstAndLastNameRegex.test(firstName));
    }, [firstName]);

    useEffect(() => {
        setValidLastName(firstAndLastNameRegex.test(lastName));
    }, [lastName]);

    useEffect(() => {
        setValidEmail(emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(passwordRegex.test(pwd));
        setValidMatchPwd(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, firstName, lastName, email, pwd, matchPwd]);

    // for regions
    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await api.get(`judete`);
                setRegions(response.data);
                console.log(regions);

            } catch (err) {
                if (err.response) {
                    // Not in the 200 response range
                    // console.log(err.response.data);
                    // console.log(err.response.status);
                    // console.log(err.response.headers);
                } else {
                    console.log(`Error: ${err.message}`);
                }
            }
        }

        fetchRegions();
    }, [])

    const handleRegistration = async (e) => {
        e.preventDefault();

        axios.post(registerURL,
            JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                username: user,
                email: email,
                password: pwd,
                dateOfBirth: date,
                region: selectedRegion,
                city: selectedCity,
                street: ""
            }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(response => {
            console.log(response.data);
            setSucces(true);
        }).catch(err => {
            setSucces(false);
            console.log(err);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.data) {
                setErrMsg(err.response.data);
            }
            else {
                setErrMsg('Registration Failed');
            }
        })
        setDisplayInfoBox(true);
        // errRef.current.focus();
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#f5f5f5',
                    padding: 3,
                }}
            >
                <Paper elevation={3} sx={{ padding: 4, maxWidth: 450, width: '100%' }}>
                    <Typography variant="h5" gutterBottom>
                        Register
                    </Typography>
                    <Box component="form" noValidate autoComplete="off">
                        <Stack spacing={2}>
                            <UserField
                                userRef={userRef}
                                user={user}
                                setUser={setUser}
                                validUser={validUser}
                                userFocus={userFocus}
                                setUserFocus={setUserFocus}
                            />
                            <Stack direction="row" spacing={2}>
                                <NameField
                                    name={firstName}
                                    setName={setFirstName}
                                    validName={validFirstName}
                                    nameFocus={firstNameFocus}
                                    setNameFocus={setFirstNameFocus}
                                    nameType={'first'}
                                />
                                <NameField
                                    name={lastName}
                                    setName={setLastName}
                                    validName={validLastName}
                                    nameFocus={lastNameFocus}
                                    setNameFocus={setLastNameFocus}
                                    nameType={'last'}
                                />
                            </Stack>
                            <EmailField
                                email={email}
                                setEmail={setEmail}
                                validEmail={validEmail}
                                emailFocus={emailFocus}
                                setEmailFocus={setEmailFocus}
                            />
                            <PasswordField
                                password={pwd}
                                setPassword={setPwd}
                                validPassword={validPwd}
                                passwordFocus={pwdFocus}
                                setPasswordFocus={setPwdFocus}
                            />
                            <MatchPasswordField
                                password={pwd}
                                matchPassword={matchPwd}
                                setMatchPassword={setMatchPwd}
                                validMatchPassword={validMatchPwd}
                                matchPasswordFocus={matchPwdFocus}
                                setMatchPasswordFocus={setMatchPwdFocus}
                            />
                            <Stack direction="row" spacing={2}>
                                <RegionField
                                    regions={regions}
                                    selectedRegion={selectedRegion}
                                    setSelectedRegion={setSelectedRegion}
                                    setSelectedRegionCode={setSelectedRegionCode}
                                />
                                <CityField
                                    cities={cities}
                                    setCities={setCities}
                                    selectedRegionCode={selectedRegionCode}
                                    selectedCity={selectedCity}
                                    setSelectedCity={setSelectedCity}
                                />

                            </Stack>

                            <DateField
                                date={date}
                                setDate={setDate}
                            />
                            {displayInfoBox &&
                                <Alert

                                    severity={succes ? "success" : "error"}
                                >
                                    {succes ? "Successfully registered" : "Failed registration"}
                                </Alert>}
                            <Button
                                variant='contained'
                                disabled={
                                    Boolean(!validUser ||
                                        !validFirstName ||
                                        !validLastName ||
                                        !validEmail ||
                                        !validPwd ||
                                        !validMatchPwd ||
                                        !selectedRegion ||
                                        !selectedCity ||
                                        !date)}
                                onClick={handleRegistration}
                            >
                                Register
                            </Button>

                        </Stack>
                    </Box>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
}
export default Register;
