import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';



export  default function TimeAndDatePicker ({setScheduleValue}){
const [scheduledAt, setscheduledAt] = useState(null)
  const CustomDateTimePicker = styled(DateTimePicker)({
    paddingBottom: '10px',
  });
  
  const currentTime = dayjs();
  const minDateTime = currentTime.add(15, 'minute');
  const maxDateTime = currentTime.add(30, 'day');
  
  const handleChange = (value) => {
    setscheduledAt(value)
    const unixTimestamp = dayjs(value).unix() * 1000; 
    return  setScheduleValue(unixTimestamp)
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomDateTimePicker
        label="Select Date and Time"
        minDateTime={minDateTime}
        maxDateTime={maxDateTime}
        value={scheduledAt}
        onAccept={(newValue) => handleChange(newValue)}
      />
    </LocalizationProvider>
  );
};