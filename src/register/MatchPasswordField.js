import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'

const MatchPasswordField = ({ password, matchPassword, setMatchPassword, validMatchPassword, matchPasswordFocus, setMatchPasswordFocus }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
            <OutlinedInput
                id="confirm-password"
                type={showPassword ? 'text' : 'password'}
                error={Boolean(password && matchPassword && !validMatchPassword)}
                required
                onChange={(e) => setMatchPassword(e.target.value)}
                aria-invalid={validMatchPassword ? "false" : "true"}
                onFocus={() => setMatchPasswordFocus(true)}
                onBlur={() => setMatchPasswordFocus(false)}
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
                label="Confirm Password"
            />
            <FormHelperText>
                {password && matchPassword && validMatchPassword
                    ? "Passwords match."
                    : !password && !validMatchPassword
                        ? "Please enter your password."
                        : password && matchPassword&& !validMatchPassword && matchPasswordFocus
                            ? "Passwords do not match."
                            : ""
                }
            </FormHelperText>
        </FormControl>
    )
}

export default MatchPasswordField
