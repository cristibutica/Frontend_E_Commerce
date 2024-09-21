import { Alert, Box, Button, Paper, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import UserField from './UserField';
import PasswordField from './PasswordField';
import axios from '../api/axios';
import GlobalContext from '../context/GlobalContext';

const Login = () => {

    const {isAuth,setIsAuth, setToken,displayInfoBox, setDisplayInfoBox, errMsg, setErrMsg,user, password, navigate} = useContext(GlobalContext);

    useEffect(() => {
        setErrMsg('');
        setDisplayInfoBox(false);
    }, [user, password]);

    const handleLogin = async (event)=>{
        event.preventDefault();

        axios.post("/login",
            JSON.stringify({
                username: user,
                password: password,
            }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(response => {
            setToken(response.data);
            localStorage.setItem('token', response.data);  // Salvează token-ul în localStorage
            setIsAuth(true);
            setDisplayInfoBox(false);
            console.log(response.data);
            
            navigate("/");
        }).catch(err => {
            setDisplayInfoBox(true);
            setIsAuth(false);
            console.log(err);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.data) {
                setErrMsg(err.response.data);
            }
            else {
                setErrMsg('Login Failed');
            }
        })
    }

    const handleCreateAcc = (e) => {
        e.preventDefault();
        setIsAuth(false);
        navigate('/register');
    }

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
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 300, width: '100%' }}>
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <Box component="form" noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <UserField />
                        <PasswordField />
                        {displayInfoBox &&
                                <Alert severity={isAuth ? "success" : "error"}>
                                    {isAuth ? "" : `${errMsg}`}
                                </Alert>}
                        <Button
                            variant='contained'
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                        <Button 
                            variant='contained'
                            onClick={handleCreateAcc}
                        >
                            Don't have an account? Register
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    )
}

export default Login
