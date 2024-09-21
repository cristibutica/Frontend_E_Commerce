import React, { useContext } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import GlobalContext from '../context/GlobalContext';

const DateField = () => {

  const { date, setDate } = useContext(GlobalContext);

  return (
    <DatePicker
      value={date}
      onChange={(newDate) => setDate(newDate)}
    >
    </DatePicker>
  )
}

export default DateField
