import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DateField = ({date, setDate}) => {
  return (
    <DatePicker
        value={date}
        onChange={(newDate) => setDate(newDate)}
    >
    </DatePicker>
  )
}

export default DateField
