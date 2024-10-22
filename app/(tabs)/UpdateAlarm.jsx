import { View, Text, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import FormField from '../../components/FormField'; 
import CustomButton from '../../components/CustomButton'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateAlarm } from '../firebase/alarmService'; 
import { useRoute } from '@react-navigation/native';

const UpdateAlarm = () => {
    const route = useRoute();
    const { alarm } = route.params;

    const [date, setDate] = useState(new Date(alarm.date.seconds * 1000)); // Convert Firestore timestamp to Date
    const [time, setTime] = useState(new Date(alarm.time.seconds * 1000));
    const [enabled, setEnabled] = useState(alarm.enabled);
    const [vibrate, setVibrate] = useState(alarm.vibrate);
    const [repeat, setRepeat] = useState(alarm.repeat);
    const [isSubmitting, setSubmitting] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    // Handle the date change
    const onChangeDate = (selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) setDate(selectedDate);
    };

    // Handle the time change
    const onChangeTime = (selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) setTime(selectedTime);
    };

    // Function to update alarm
    async function handleUpdate() {
        setSubmitting(true);
        try {
            const updatedAlarm = {
                id: alarm.id, // Keep the ID to update the specific document
                date: date,
                time: time,
                enabled,
                vibrate,
                repeat,
            };

            await updateAlarm(updatedAlarm); // Update in Firebase

            Alert.alert('Success', 'Alarm updated successfully!');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', paddingHorizontal: 16, marginVertical: 24 }}>
                    <Text style={{ fontSize: 24, color: 'black', fontWeight: '600', marginBottom: 20 }}>Update Alarm</Text>

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
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => onChangeDate(selectedDate)}
                            />
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
                            <Text>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                        </TouchableOpacity>
                        {showTimePicker && (
                            <DateTimePicker
                                value={time}
                                mode="time"
                                display="default"
                                onChange={(event, selectedTime) => onChangeTime(selectedTime)}
                            />
                        )}
                    </View>

                    {/* Alarm Enabled Switch */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: 16 }}>Alarm Enabled</Text>
                        <Switch
                            value={enabled}
                            onValueChange={(value) => setEnabled(value)}
                        />
                    </View>

                    {/* Vibrate Switch */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: 16 }}>Vibrate</Text>
                        <Switch
                            value={vibrate}
                            onValueChange={(value) => setVibrate(value)}
                        />
                    </View>

                    {/* Repeat Frequency Input */}
                    <FormField
                        title="Repeat Frequency"
                        value={repeat}
                        placeholder="Enter repeat frequency"
                        handleChangeText={setRepeat}
                        otherStyles="my-3"
                    />

                    {/* Update Button */}
                    <CustomButton
                        title="Update Alarm"
                        handlePress={handleUpdate}
                        containerStyles="mt-5"
                        isLoading={isSubmitting}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default UpdateAlarm;
