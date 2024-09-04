import React from 'react'
import TextField from '@mui/material/TextField';

const NameField = ({ name, setName, validName, nameFocus, setNameFocus, nameType }) => {

    const capitalizeString = (str) => {
        if(str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1); 
    }

    return (
        <TextField
            required
            error={Boolean(name && !validName)}
            helperText={
                name && validName
                    ? `Accepted ${nameType} name.`
                    : !name && !validName
                        ? `Please enter your ${nameType} name`
                        : name && !validName && nameFocus
                            ? `${capitalizeString(nameType)} name must be between 4-24 characters, and start with a capital letter.`
                            : ""
            }
            id={`${nameType}-name`}
            label={`${capitalizeString(nameType)} name`}
            autoComplete='off'
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={validName ? "false" : "true"}
            aria-describedby='uidnote'
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
        />
    )
}

export default NameField
