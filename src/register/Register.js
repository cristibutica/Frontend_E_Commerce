import React from 'react';
import { useRef, useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import UserField from './UserField';
import NameField from './NameField';
import EmailField from './EmailField';
import PasswordField from './PasswordField';

const firstAndLastNameRegex = /^[A-Z][a-z]{3,23}$/;
const userRegex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

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

    const [errMsg, setErrMsg] = useState('');
    const [succes, setSucces] = useState(false);

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

    return (
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
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 350, width: '100%' }}>
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
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
};

export default Register;
