import React, { useContext } from 'react';
import { useRef, useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import GlobalContext from '../context/GlobalContext';

const UserField = () => {

    const [userFocus, setUserFocus] = useState(false);
    const { userRef, user, setUser } = useContext(GlobalContext)

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