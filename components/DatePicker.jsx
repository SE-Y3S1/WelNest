// components/DatePicker.js
import React, { useState } from 'react';
import { View, Button, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ label, value, onChange }) => {
  const [show, setShow] = useState(false);

  const showPicker = () => {
    setShow(true);
  };

  const onDateChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || value;
    onChange(currentDate);
  };

  return (
    <View>
      <Button title={label} onPress={showPicker} />
      <Text>{value ? value.toLocaleDateString() : 'Select date'}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

export default DatePicker;
