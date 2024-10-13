import React, { useContext } from 'react'

import { MenuItem, TextField } from '@mui/material'
import GlobalContext from '../context/GlobalContext'

const RegionField = () => {

  const { cachedRegions, setSelectedRegionCode, selectedRegion, setSelectedRegion } = useContext(GlobalContext);

  const handleChange = (e) => {

    const selectedRegionObj = regions.find(region => region.nume === e.target.value);
    
        if (selectedRegionObj) {
          setSelectedRegion(selectedRegionObj.nume);
          setSelectedRegionCode(selectedRegionObj.auto);
        }

  }

  return (
    <TextField sx={{ m: 1, width: "50%" }}
      id="region-field"
      select
      required
      label="Region"
      value={selectedRegion}
      onChange={handleChange}
      helperText={
        selectedRegion ? "" : "Please select your region"
      }
    >
      {cachedRegions.sort((a, b) => a.nume.localeCompare(b.nume)).map((region) => (
        <MenuItem key={region.auto} value={region.nume}>
          {region.nume}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default RegionField
