import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { fetchSymptomsByDate, fetchAllSymptoms } from '../firebase/symptomService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { icons } from '../../constants';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [reminder, setReminder] = useState('');
  const [reminders, setReminders] = useState({});
  const [symptoms, setSymptoms] = useState({});
  const [markedDates, setMarkedDates] = useState({});

  const changeMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const addReminder = () => {
    if (reminder.trim() && selectedDate) {
      setReminders((prevReminders) => ({
        ...prevReminders,
        [selectedDate]: [...(prevReminders[selectedDate] || []), reminder],
      }));
      setReminder('');
    }
  };

  const monthFormat = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  const onDateSelect = (day) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);

    fetchSymptomsByDate(dateString, (fetchedSymptoms) => {
      setSymptoms((prevSymptoms) => ({
        ...prevSymptoms,
        [dateString]: fetchedSymptoms,
      }));
    });
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Mild':
        return '#00d12e';
      case 'Moderate':
        return '#ffa500';
      case 'Severe':
        return '#ff0000';
      default:
        return '#efefef';
    }
  };

  useEffect(() => {
    const unsubscribe = fetchAllSymptoms((allSymptoms) => {
      const marked = {};

      if (Array.isArray(allSymptoms)) {
        allSymptoms.forEach(symptom => {
          const date = symptom.date;
          if (date) {
            const [day, month, year] = date.split('/');
            const formattedDate = `${year}-${month}-${day}`; // Convert to yyyy-mm-dd
            marked[formattedDate] = { marked: true, dotColor: '#FFA001' }; 
          }
        });
        setMarkedDates(marked);
      } else {
        console.error('Invalid data format:', allSymptoms);
      }
    });

      return () => unsubscribe();
    }, []);
    
    const combinedMarkedDates = {
      ...markedDates,
      ...(selectedDate && {
        [selectedDate]: { selected: true, marked: true, selectedColor: '#FFA001' },
      }),
    };
  
  const getData = () => {
    let data = [
      { type: 'calendar', key: 'calendar' },
      { type: 'selectedDate', key: 'selectedDate' },
    ];

    if (symptoms[selectedDate]) {
      data.push({ type: 'symptoms', key: 'symptoms' });
    }

    if (selectedDate) {
      data.push({ type: 'reminderInput', key: 'reminderInput' });

      if (reminders[selectedDate]) {
        data.push({ type: 'reminders', key: 'reminders' });
      }
    }

    return data;
  };

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'calendar':
        return (
          <View>
            <Calendar
               current={currentMonth.toISOString().split('T')[0]}
               markedDates={combinedMarkedDates} 
               onDayPress={onDateSelect}
               style={styles.calendar}
               theme={{
                arrowColor: '#FF6347',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#FEA405',
                dayTextColor: '#2d4150',
                textDisabledColor: '#a2a2a2'
              }}/>
          </View>
        );

      case 'symptoms':
        return (
          <View className="mt-4">
            <FlatList
              data={symptoms[selectedDate]}
              renderItem={({ item }) => (
                <View className="mt-2 py-2 px-2 rounded-lg bg-[#ffffff] shadow-sm shadow-black shadow-opacity-40">
                  <Text className="text-xl font-pbold">{item.symptom}</Text>
                  <View className="w-[90.02px] h-6 absolute" style={{ right: 30, top: 20 }}>
                    <View style={{ backgroundColor: getSeverityColor(item.severity) }} className="w-[90.02px] h-6 rounded-[10px]"></View>
                    <Text className="w-[53.58px] h-[17px] absolute text-center text-white text-[13px] font-bold" style={{ left: 19.29, top: 3 }}>
                      {item.severity}
                    </Text>
                  </View>
                  <Text className="text-lg">{item.note}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        );


      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9F9F9]">
      <View>
        <Text className="text-black text-3xl font-bold text-center mt-12">Calendar</Text>
      </View>
      <FlatList
        data={getData()}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ padding: 16 }}
      />
      <View className="absolute bottom-5 w-full flex-row justify-center">
                <TouchableOpacity
                    onPress={() => {
                        router.push('/symptomForm');
                    }}
                >
                    <Image
                        className="w-12 h-12"
                        source={icons.plus}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
    </SafeAreaView>
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
