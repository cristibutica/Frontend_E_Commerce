import React, { useContext } from 'react';
import { useRef, useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import LoginContext from '../context/LoginContext';

const UserField = () => {

    const [userFocus, setUserFocus] = useState(false);
    const { userRef, user, setUser } = useContext(LoginContext)

    return (
        <TextField
            required
            id="user-input"
            label="User Name"
            ref={userRef}
            autoComplete='off'
            value={user}
            onChange={(e) => setUser(e.target.value)}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
        />
    )
}

export default UserField;
//"Username must be 4-24 characters, and start with a letter."