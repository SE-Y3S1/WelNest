import { View, Text, ScrollView, TextInput, Switch, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateBedtime, deleteBedtime } from './firebase/sTrackService'; 
import { useRoute } from '@react-navigation/native';

const UpdateBedtime = () => {
    const route = useRoute();
    const { bedtime } = route.params;

    const [date, setDate] = useState(new Date(bedtime.date.seconds * 1000));  // Convert Firestore timestamp to Date
    const [bedTime, setBedTime] = useState(new Date(bedtime.bedTime.seconds * 1000));
    const [doNotDisturb, setDoNotDisturb] = useState(bedtime.doNotDisturb);
    const [note, setNote] = useState(bedtime.note);
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
        if (selectedTime) setBedTime(selectedTime);
    };

    // Function to update bedtime
    async function handleUpdate() {
        setSubmitting(true);
        try {
            const updatedBedtime = {
                id: bedtime.id, // Keep the ID to update the specific document
                date: date,
                bedTime: bedTime,
                doNotDisturb,
                note,
            };

            await updateBedtime(updatedBedtime);  // Update in Firebase

            Alert.alert('Success', 'Bedtime updated successfully!');
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
                    <Text className="text-2xl text-black font-semibold -mt-5">Update Bedtime</Text>

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

                    {/* Bed Time Picker */}
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
                            <DateTimePicker
                                value={bedTime}
                                mode="time"
                                display="default"
                                onChange={(event, selectedTime) => onChangeTime(selectedTime)}
                            />
                        )}
                    </View>

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

                    {/* Update Button */}
                    <CustomButton
                        title="Update Bedtime"
                        handlePress={handleUpdate}
                        containerStyles="mt-5"
                        isLoading={isSubmitting}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default UpdateBedtime;
