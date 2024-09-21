import React, { useContext } from 'react';
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
import RegionField from './RegionField';
import api from '../api/location';
import axios from '../api/axios';
import CityField from './CityField';
import MatchPasswordField from './MatchPasswordField';
import DateField from './DateField';
import GlobalContext from '../context/GlobalContext';
import { useNavigate } from 'react-router';

const firstAndLastNameRegex = /^[A-Z][a-z]{2,23}$/;
const userRegex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const registerURL = '/register'

const Register = () => {
    const { userRef, user, setUser, validUser, setValidUser, firstName, setFirstName, validFirstName, setValidFirstName, lastName, setLastName, validLastName, setValidLastName, email, setEmail, validEmail, setValidEmail, password, setPassword, validPassword, setValidPassword, matchPassword, setMatchPassword, validMatchPassword, setValidMatchPassword, regions, setRegions, selectedRegion, setSelectedRegion, selectedRegionCode, setSelectedRegionCode, selectedCity, setSelectedCity, date, setDate,displayInfoBox, setDisplayInfoBox, errMsg, setErrMsg } = useContext(GlobalContext)
    
    const [succes, setSucces] = useState(false);
    
    const navigate = useNavigate();

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
        setValidPassword(passwordRegex.test(password));
        setValidMatchPassword(password === matchPassword);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrMsg('');
        setDisplayInfoBox(false);
    }, [user, firstName, lastName, email, password, matchPassword]);

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
    }, [])

    const handleRegistration = async (e) => {
        e.preventDefault();

        axios.post(registerURL,
            JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                username: user,
                email: email,
                password: password,
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
            setDisplayInfoBox(true);
        }).catch(err => {
            setDisplayInfoBox(true);
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

    }

    const handleAlreadyReg = (e) => {
        e.preventDefault();
        navigate('/login')
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
                            <UserField />
                            <Stack direction="row" spacing={2}>
                                <NameField nameType={'first'} />
                                <NameField nameType={'last'} />
                            </Stack>
                            <EmailField />
                            <PasswordField />
                            <MatchPasswordField />
                            <Stack direction="row" spacing={2}>
                                <RegionField />
                                <CityField />
                            </Stack>
                            <DateField />
                            {displayInfoBox &&
                                <Alert severity={succes ? "success" : "error"}>
                                    {succes ? "Successfully registered" : `${errMsg}`}
                                </Alert>}
                            <Button
                                variant='contained'
                                disabled={
                                    Boolean(!validUser ||
                                        !validFirstName ||
                                        !validLastName ||
                                        !validEmail ||
                                        !validPassword ||
                                        !validMatchPassword ||
                                        !selectedRegion ||
                                        !selectedCity ||
                                        !date)}
                                onClick={handleRegistration}
                            >
                                Register
                            </Button>
                            <Button
                                variant='contained'
                                onClick={handleAlreadyReg}
                            >
                                Already registered? Login
                            </Button>
                        </Stack>
                    </Box>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
}

export default Register;
