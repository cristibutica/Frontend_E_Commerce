import React, { useContext } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import RegisterContext from '../context/RegisterContext';

const DateField = () => {

  const { date, setDate } = useContext(RegisterContext);

  return (
    <DatePicker
      value={date}
      onChange={(newDate) => setDate(newDate)}
    >
    </DatePicker>
  )
}

export default DateField
