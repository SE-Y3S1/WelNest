import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const SetBedtime = () => {
  const [date, setDate] = useState(new Date());
  const [bedTime, setBedTime] = useState(new Date());
  const [doNotDisturb, setDoNotDisturb] = useState(true);
  const [note, setNote] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) setBedTime(selectedTime);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Set Bed Time</Text>

      {/* Date Picker */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#ddd',
          justifyContent: 'center',
        }}>
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker value={date} mode="date" display="default" onChange={onChangeDate} />
        )}
      </View>

      {/* Time Picker */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Bed Time</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#ddd',
          justifyContent: 'center',
        }}>
          <Text>{bedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker value={bedTime} mode="time" display="default" onChange={onChangeTime} />
        )}
      </View>

      {/* Do Not Disturb Switch */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Do Not Disturb</Text>
        <Switch value={doNotDisturb} onValueChange={(value) => setDoNotDisturb(value)} />
      </View>

      {/* Note Input */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Note</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
            padding: 10,
          }}
          placeholder="Add a note..."
          value={note}
          onChangeText={(text) => setNote(text)}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={{
        backgroundColor: '#FFA500',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
      }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetBedtime;
