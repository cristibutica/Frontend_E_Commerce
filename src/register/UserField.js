import React, { useContext } from 'react';
import { useRef, useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import GlobalContext from '../context/GlobalContext';

const UserField = () => {

    const [userFocus, setUserFocus] = useState(false);
    const { userRef, user, setUser, validUser } = useContext(GlobalContext)

    return (
        <TextField
            required
            error={Boolean(user && !validUser)}
            helperText={
                user && validUser
                    ? "Accepted username"
                    : !user && !validUser
                        ? "Please enter your username"
                        : user && !validUser && userFocus
                            ? "Username must be 4-24 characters, and start with a letter."
                            : ""
            }
            id="user-input"
            label="User Name"
            ref={userRef}
            autoComplete='off'
            value={user}
            onChange={(e) => setUser(e.target.value)}
            aria-invalid={validUser ? "false" : "true"}
            aria-describedby='uidnote'
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
        />
    )
}

export default UserField;
//"Username must be 4-24 characters, and start with a letter."