import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import { addAlarm } from './firebase/alarmService'; 
import { useNavigation } from '@react-navigation/native';

const SetAlarm = () => {
  const [alarmName, setAlarmName] = useState('');
  const [alarmDate, setAlarmDate] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState(new Date());
  const [alarmEnabled, setAlarmEnabled] = useState(true);
  const [vibrate, setVibrate] = useState(false);
  const [repeat, setRepeat] = useState('none');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const navigation = useNavigation(); // Initialize navigation

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setAlarmDate(selectedDate);
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) setAlarmTime(selectedTime);
  };

  // Function to handle alarm submission
  const logAlarm = async () => {
    setSubmitting(true);
    try {
      const alarmData = {
        name: alarmName,
        date: alarmDate instanceof Date ? alarmDate : new Date(),
        time: alarmTime instanceof Date ? alarmTime : new Date(),
        enabled: alarmEnabled,
        vibrate,
        repeat,
      };

      console.log("Submitting alarm data:", alarmData);

      // Call your Firebase service to add the alarm
      await addAlarm(alarmData);

      // Clear form after successful submission
      setAlarmName('');
      setAlarmDate(new Date());
      setAlarmTime(new Date());
      setAlarmEnabled(true);
      setVibrate(false);
      setRepeat('none');

      Alert.alert('Success', 'Alarm set successfully!');

      // Navigate to the Alarms screen (or any screen you prefer)
      navigation.navigate('alarms'); 
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Set Alarm</Text>

      {/* Alarm Name Input */}
      <FormField
        title="Alarm Name"
        value={alarmName}
        placeholder="Enter alarm name..."
        handleChangeText={setAlarmName}
        otherStyles="my-3"
      />

      {/* Date Picker */}
      <FormField
        title="Date"
        value={alarmDate.toLocaleDateString()}
        placeholder="Select a date"
        handleChangeText={() => setShowDatePicker(true)}
        otherStyles="my-3"
        isTouchable
      />
      {showDatePicker && (
        <DateTimePicker
          value={alarmDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {/* Time Picker */}
      <FormField
        title="Alarm Time"
        value={alarmTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        placeholder="Select a time"
        handleChangeText={() => setShowTimePicker(true)}
        otherStyles="my-3"
        isTouchable
      />
      {showTimePicker && (
        <DateTimePicker
          value={alarmTime}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}

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
      <CustomButton
        title="Add Alarm"
        handlePress={logAlarm}
        containerStyles="mt-5"
        isLoading={isSubmitting} // Show loading state
      />

      {/* Navigate to Alarms Button */}
      <CustomButton
        title="Go to Alarms"
        handlePress={() => navigation.navigate('alarms')}
        containerStyles="mt-5"
      />
    </ScrollView>
  );
};

export default SetAlarm;
