import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react'
import UserField from './UserField';
import PasswordField from './PasswordField';
import LoginContext from '../context/LoginContext';
import axios from '../api/axios';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const {user, password, navigate} = useContext(LoginContext);

    const {setIsAuth, setToken} = useContext(AuthContext);
    
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
            setIsAuth(true);
            navigate("/");

            // setSucces(true);
            // setDisplayInfoBox(true);
        }).catch(err => {
            // setDisplayInfoBox(true);
            // setSucces(false);
            console.log(err);
            // if (!err?.response) {
            //     setErrMsg('No Server Response');
            // } else if (err.response?.data) {
            //     setErrMsg(err.response.data);
            // }
            // else {
            //     setErrMsg('Registration Failed');
            // }
        })


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
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 450, width: '100%' }}>
                <Typography variant="h5" gutterBottom>
                    Register
                </Typography>
                <Box component="form" noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <UserField />
                       
                        <PasswordField />
                        <Button
                            variant='contained'
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    )
}

export default Login
