import { View, Text, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation } from '@react-navigation/native'; // Import useNavigation
import { addBedtime } from './firebase/sTrackService';  // Firebase service for Bedtime

const SetBedtime = () => {
    const [date, setDate] = useState(new Date());
    const [bedTime, setBedTime] = useState(new Date());
    const [doNotDisturb, setDoNotDisturb] = useState(true);
    const [note, setNote] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const route = useRoute();  // Access route parameters if needed
    const navigation = useNavigation();  // Use the useNavigation hook to access the navigation object

    // Function to handle date change
    const onChangeDate = (selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) setDate(selectedDate);
    };

    // Function to handle time change
    const onChangeTime = (selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) setBedTime(selectedTime);
    };

    // Function to log bedtime
    async function logBedtime() {
        setSubmitting(true);

        try {
            const bedTimeData = {
                date: date instanceof Date ? date : new Date(),
                bedTime: bedTime instanceof Date ? bedTime : new Date(),
                doNotDisturb,
                note
            };

            console.log("Submitting bedtime data:", { date, bedTime, doNotDisturb, note });

            // Call the addBedtime function from the service file
            await addBedtime(bedTimeData);

            // Clear form after successful submission
            setDate(new Date());
            setBedTime(new Date());
            setDoNotDisturb(true);
            setNote('');

            Alert.alert('Success', 'Bedtime logged successfully!');

            // Navigate to Schedules page
            navigation.navigate('schedules');  // Use navigation to go to Schedules screen
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="w-full h-full justify-center px-4 my-6">
                    <Text className="text-2xl text-black font-semibold -mt-5">Set Bedtime</Text>

                    {/* Date Picker */}
<FormField
    title="Date"
    value={date.toLocaleDateString()}
    placeholder="Select a date"
    handleChangeText={() => setShowDatePicker(true)} // Trigger date picker when tapped
    otherStyles="my-3"
    isTouchable // Add a prop to make it touchable
/>

{/* Date Picker */}
{showDatePicker && (
    <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => onChangeDate(selectedDate)}
    />
)}

                    {/* Bed Time Picker */}
                   {/* Bed Time Picker */}
<FormField
    title="Bed Time"
    value={bedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    placeholder="Select a time"
    handleChangeText={() => setShowTimePicker(true)} // Trigger time picker when tapped
    otherStyles="my-3"
    isTouchable // Add a prop to make it touchable
/>

{/* Time Picker */}
{showTimePicker && (
    <DateTimePicker
        value={bedTime}
        mode="time"
        display="default"
        onChange={(event, selectedTime) => onChangeTime(selectedTime)}
    />
)}


                    {/* Do Not Disturb Switch */}
                    <View className="flex-row justify-between items-center mt-4">
                        <Text className="text-lg">Do Not Disturb</Text>
                        <Switch
                            value={doNotDisturb}
                            onValueChange={(value) => setDoNotDisturb(value)}
                        />
                    </View>

                    {/* Note Input */}
                    <FormField
                        title="Note"
                        value={note}
                        placeholder="Enter a note here"
                        handleChangeText={setNote}
                        otherStyles="my-3"
                    />

                    {/* Save Button */}
                    <CustomButton
                        title="Add Bedtime"
                        handlePress={logBedtime}
                        containerStyles="mt-5"
                        isLoading={isSubmitting}
                    />

                    {/* Navigate to Schedules Button */}
                    <CustomButton
                        title="Go to Schedules"
                        handlePress={() => navigation.navigate('schedules')}  // Navigate to Schedules screen
                        containerStyles="mt-5"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SetBedtime;
