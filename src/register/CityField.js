import React, { useContext, useEffect, useState } from 'react';
import api from '../api/location';
import { MenuItem, TextField } from '@mui/material';
import GlobalContext from '../context/GlobalContext';

const CityField = () => {

    const { selectedRegionCode, selectedCity, setSelectedCity } = useContext(GlobalContext);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            if (selectedRegionCode) {
                try {
                    const response = await api.get(`orase/${selectedRegionCode}`);
                    setCities(response.data);
                    console.log(cities);
                } catch (err) {
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else {
                        console.log(`Error: ${err.message}`);
                    }
                }
            }
        };

        fetchCities();
    }, [selectedRegionCode]);

    // if there is already a city in the seenCity set, return false so that it doesn't add the duplicate city in the cities
    const uniqueCities = (cities) => {
        const seenCity = new Set();
        return cities.filter((city) => {
            const duplicate = seenCity.has(city.nume)
            seenCity.add(city.nume);
            return !duplicate;
        })
    }

    const handleChange = (e) => {
        setSelectedCity(e.target.value)
    }

    return (
        <TextField sx={{ m: 1, width: "50%" }}
            id="city-field"
            select
            required
            label="City"
            value={selectedCity}
            onChange={handleChange}
            helperText={selectedCity ? "" : "Please select your city"}
        >
            {Array.isArray(cities) && cities.length > 0 ? (

                uniqueCities(cities).sort((a, b) =>
                    a.nume.localeCompare(b.nume)
                ).map((city) => (
                    <MenuItem key={city.nume} value={city.nume}>
                        {city.nume}
                    </MenuItem>
                ))
            ) : (
                <MenuItem disabled value="">
                    No cities available
                </MenuItem>
            )}
        </TextField>
    );
};

export default CityField;
