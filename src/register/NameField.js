import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import RegisterContext from '../context/RegisterContext';

const NameField = ({ nameType }) => {
    
    const { firstName, setFirstName, validFirstName, lastName, setLastName, validLastName } = useContext(RegisterContext);
    const [firstNameFocus, setFirstNameFocus] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const capitalizeString = (str) => {
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    if (nameType === 'first') {
        return (
            <TextField
                required
                error={Boolean(firstName && !validFirstName)}
                helperText={
                    firstName && validFirstName
                        ? `Accepted ${nameType} name.`
                        : !firstName && !validFirstName
                            ? `Please enter your ${nameType} name`
                            : firstName && !validFirstName && firstNameFocus
                                ? `${capitalizeString(nameType)} name must be between 4-24 characters, and start with a capital letter.`
                                : ""
                }
                id={`${nameType}-name`}
                label={`${capitalizeString(nameType)} name`}
                autoComplete='off'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                aria-invalid={validFirstName ? "false" : "true"}
                aria-describedby='uidnote'
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
            />
        );
    } else {
        return (
            <TextField
                required
                error={Boolean(lastName && !validLastName)}
                helperText={
                    lastName && validLastName
                        ? `Accepted ${nameType} name.`
                        : !lastName && !validLastName
                            ? `Please enter your ${nameType} name`
                            : lastName && !validLastName && lastNameFocus
                                ? `${capitalizeString(nameType)} name must be between 4-24 characters, and start with a capital letter.`
                                : ""
                }
                id={`${nameType}-name`}
                label={`${capitalizeString(nameType)} name`}
                autoComplete='off'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                aria-invalid={validLastName ? "false" : "true"}
                aria-describedby='uidnote'
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
            />
        );
    }
}

export default NameField;
