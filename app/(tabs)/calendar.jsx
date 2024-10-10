import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [reminder, setReminder] = useState('');
  const [reminders, setReminders] = useState({}); // Store reminders for each date

  // Handler for date selection
  const onDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  // Handler to change the month
  const changeMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  // Handler to add reminder
  const addReminder = () => {
    if (reminder.trim() && selectedDate) {
      setReminders((prevReminders) => ({
        ...prevReminders,
        [selectedDate]: [...(prevReminders[selectedDate] || []), reminder],
      }));
      setReminder(''); // Clear input after adding
    }
  };

  const monthFormat = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <View className="flex-1 bg-[#F9F9F9] mt-12">
      {/* Header Section */}
      <View className="bg-[#FFA001] p-4 rounded-b-lg shadow-lg">
        <Text className="text-black text-3xl font-bold text-center">Calendar</Text>
      </View>

      {/* Main Content Section */}
      <View className="flex-1 p-4 mt-2">
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity onPress={() => changeMonth(-1)}>
            <Text className="text-[#26221A] text-xl">&lt; Prev</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold">{monthFormat}</Text>
          <TouchableOpacity onPress={() => changeMonth(1)}>
            <Text className="text-[#26221A] text-xl">Next &gt;</Text>
          </TouchableOpacity>
        </View>

        <Calendar
          current={currentMonth.toISOString().split('T')[0]}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: '#FFA001' },
          }}
          onDayPress={onDateSelect}
          style={styles.calendar}
        />

        <View className="mt-4">
          <Text className="text-lg font-semibold">Selected Date:</Text>
          <Text className="text-lg">{selectedDate ? selectedDate : 'None'}</Text>
        </View>

        {/* Reminder Input Section */}
        {selectedDate && (
          <View className="mt-4">
            <TextInput
              value={reminder}
              onChangeText={setReminder}
              placeholder="Add a reminder..."
              className="border border-[#cccccc] p-2 rounded"
            />
            <TouchableOpacity onPress={addReminder} className="bg-[#FFA001] p-2 rounded mt-2">
              <Text className="text-white text-center">Add Reminder</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Reminder List */}
        {reminders[selectedDate] && (
          <View className="mt-4">
            <Text className="text-lg font-semibold">Reminders:</Text>
            <FlatList
              data={reminders[selectedDate]}
              renderItem={({ item }) => (
                <Text className="text-lg">- {item}</Text>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    padding: 10,
  },
});

export default CalendarPage;
