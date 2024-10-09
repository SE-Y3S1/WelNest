import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const SetAlarm = () => {
  const [alarmName, setAlarmName] = useState('');
  const [alarmDate, setAlarmDate] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState(new Date());
  const [alarmEnabled, setAlarmEnabled] = useState(true);
  const [note, setNote] = useState('');
  const [vibrate, setVibrate] = useState(false);
  const [repeat, setRepeat] = useState('none');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setAlarmDate(selectedDate);
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) setAlarmTime(selectedTime);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Set Alarm</Text>

      {/* Alarm Name Input */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Alarm Name</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
            padding: 10,
          }}
          placeholder="Enter alarm name..."
          value={alarmName}
          onChangeText={(text) => setAlarmName(text)}
        />
      </View>

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
          <Text>{alarmDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker value={alarmDate} mode="date" display="default" onChange={onChangeDate} />
        )}
      </View>

      {/* Time Picker */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Alarm Time</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#ddd',
          justifyContent: 'center',
        }}>
          <Text>{alarmTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker value={alarmTime} mode="time" display="default" onChange={onChangeTime} />
        )}
      </View>

      {/* Repeat Picker */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Repeat</Text>
        <Picker
          selectedValue={repeat}
          style={{ height: 50, borderColor: '#ddd', borderWidth: 1, borderRadius: 5 }}
          onValueChange={(itemValue) => setRepeat(itemValue)}
        >
          <Picker.Item label="None" value="none" />
          <Picker.Item label="Daily" value="daily" />
          <Picker.Item label="Weekly" value="weekly" />
          <Picker.Item label="Monthly" value="monthly" />
        </Picker>
      </View>

      {/* Alarm Enabled Switch */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Alarm Enabled</Text>
        <Switch value={alarmEnabled} onValueChange={(value) => setAlarmEnabled(value)} />
      </View>

      {/* Vibration Toggle */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Vibrate</Text>
        <Switch value={vibrate} onValueChange={(value) => setVibrate(value)} />
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
    </ScrollView>
  );
};

export default SetAlarm;
