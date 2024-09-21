import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import GlobalContext from '../context/GlobalContext';

const EmailField = () => {

    const { email, setEmail, validEmail } = useContext(GlobalContext);
    const [emailFocus, setEmailFocus] = useState(false);

    return (
        <TextField
            required
            error={Boolean(email && !validEmail)}
            helperText={
                email && validEmail
                    ? "Accepted email."
                    : !email && !validEmail
                        ? "Please enter your email."
                        : email && !validEmail && emailFocus
                            ? "Incorrect email format."
                            : ""
            }
            id="email-input"
            label="E-mail"
            autoComplete='off'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby='uidnote'
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
        />
    )
}

export default EmailField
