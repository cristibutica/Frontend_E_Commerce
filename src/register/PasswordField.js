import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'

const PasswordField = ({ password, setPassword, validPassword, passwordFocus, setPasswordFocus }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                error={Boolean(password && !validPassword)}
                required
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={validPassword ? "false" : "true"}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={(e) => e.preventDefault()}
                            onMouseUp={(e) => e.preventDefault()}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
            />
            <FormHelperText>
                {password && validPassword
                    ? "Accepted password."
                    : !password && !validPassword
                        ? "Please enter your password."
                        : password && !validPassword && passwordFocus
                            ? "Password must contain a minimum of eight characters, at least one lower case letter, one upper case letter, one digit, and one special character."
                            : ""
                }
            </FormHelperText>
        </FormControl>
    )
}

export default PasswordField
