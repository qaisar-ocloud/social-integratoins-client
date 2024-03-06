import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/en'; // Import the desired locale if not already imported

dayjs.extend(utc);
dayjs.extend(timezone);

const TimeAndDatePicker = ({ setScheduleValue }) => {
  const [scheduledAt, setscheduledAt] = useState(null);

  const CustomDateTimePicker = styled(DateTimePicker)({
    paddingBottom: '10px',
  });

  const currentTime = dayjs();
  const minDateTime = currentTime.add(15, 'minute');
  const maxDateTime = currentTime.add(30, 'day');

  const handleChange = (value) => {
    setscheduledAt(value);
    const utcTime = dayjs(value);
    const localTimeOffset = dayjs().utcOffset();
    const localTime = utcTime.add(localTimeOffset, 'minute');
    const localTimeString = localTime.format();
    const unixTimestamp = dayjs(localTimeString).unix();
    return  setScheduleValue(unixTimestamp)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomDateTimePicker
        label="Select Date and Time"
        minDateTime={minDateTime}
        maxDateTime={maxDateTime}
        timezone={dayjs.tz.guess()} // Set the timezone to the user's local timezone
        value={scheduledAt}
        onAccept={(newValue) => handleChange(newValue)}
      />
    </LocalizationProvider>
  );
};

export default TimeAndDatePicker;
