import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Box, Paper, Stack, Typography, Button, Alert } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import UserField from '../register/UserField';
import NameField from '../register/NameField';
import EmailField from '../register/EmailField';
import PasswordField from '../register/PasswordField';
import RegionField from '../register/RegionField';
import CityField from '../register/CityField';
import DateField from '../register/DateField';
import axios from '../api/axios';
import GlobalContext from '../context/GlobalContext';

const updateUserURL = '/user/myaccount';

const UserInfo = () => {

    

    const { token, setErrMsg, setDisplayInfoBox, displayInfoBox, user, setUser, setValidUser, firstName, setFirstName, setValidFirstName, lastName, setLastName, setValidLastName, email, setEmail, setValidEmail, setPassword, setRegion, setCity, setDate, userRegex, firstAndLastNameRegex, emailRegex, passwordRegex, registerURL,navigate,fetchRegions } = useContext(GlobalContext);

    // const cachedRegionsAndCity = useMemo(
       
    //     () => 
    // )

    const [succes, setSucces] = useState(false);

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
        const fetchUserInfo = async () => {
            const authToken = token || localStorage.getItem('token');
            if (!authToken) {
                setErrMsg('No token available');
                return;
            }

            try {
                const response = await axios.get(updateUserURL, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = response.data;
                console.log(data);
                setUser(data.username);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setEmail(data.email);
                setRegion(data.region);
                setCity(data.city);
                setDate(data.dateOfBirth)
                // Setează datele utilizatorului în starea locală
            } catch (err) {
                setDisplayInfoBox(true);
                setSucces(false);
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.data) {
                    setErrMsg(err.response.data);
                } else {
                    setErrMsg('Failed to fetch user info');
                }
            }
        };

        fetchUserInfo();
    }, [token]);


    const handleUpdateUser = async (e) => {
        e.preventDefault();

        // Colectează datele din form și trimite un request de update
        try {
            const response = await axios.post(updateUserURL,
                JSON.stringify({
                    // Datele utilizatorului care trebuie modificate
                }),
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data);
            setSucces(true);
            setDisplayInfoBox(true);
        } catch (err) {
            setDisplayInfoBox(true);
            setSucces(false);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.data) {
                setErrMsg(err.response.data);
            } else {
                setErrMsg('Failed to update user info');
            }
        }
    };

    const handleGoBack = (e) => {
        e.preventDefault();
        navigate('/')

    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: 3 }}>
                <Paper elevation={3} sx={{ padding: 4, maxWidth: 450, width: '100%' }}>
                    <Button 
                        variant="contained" 
                        onClick={handleGoBack}
                    >
                        Go back
                    </Button>
                    <Typography variant="h5" gutterBottom>User Info</Typography>
                    <Box component="form" noValidate autoComplete="off">
                        <Stack spacing={2}>
                            <UserField />
                            <Stack direction="row" spacing={2}>
                                <NameField nameType={'first'} />
                                <NameField nameType={'last'} />
                            </Stack>
                            <EmailField />
                            <Stack direction="row" spacing={2}>
                                <RegionField />
                                <CityField />
                            </Stack>
                            <DateField />
                            {displayInfoBox &&
                                <Alert severity={succes ? "success" : "error"}>
                                    {succes ? "Successfully updated" : "Failed to update"}
                                </Alert>}
                            <Button variant="contained" onClick={handleUpdateUser}>Update User Info</Button>
                        </Stack>
                    </Box>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
};

export default UserInfo;
