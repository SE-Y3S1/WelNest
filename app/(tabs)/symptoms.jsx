import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react';
import { addSymptom } from '../firebase/symptomService'

const symptoms = () => {
    const [symptom, setSymptom] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [severity, setSeverity] = useState('');
    const [note, setNote] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    async function log() {


        setSubmitting(true);

        try {
            const symptomData = {
                symptom,
                date: date instanceof Date ? date : new Date(),
                time,
                severity,
                note
            };

            console.log("Submitting symptom data:", { symptom, date, time, severity, note });

            // Call the addSymptom function from the service file
            await addSymptom(symptomData);

            // Clear form after successful submission
            setSymptom('');
            setDate(new Date());
            setTime('');
            setSeverity('');
            setNote('');

            Alert.alert('Success', 'Symptom logged successfully!');
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
                    <Text className="text-2xl text-black font-psemibold -mt-5">Log a Symptom</Text>
                    <FormField
                        placeholder="Enter your symptom here"
                        title="Symptom"
                        value={symptom}
                        handleChangeText={setSymptom}
                        otherStyles="mt-6" />
                    <FormField
                        title="Date"
                        value={date ? date.toLocaleDateString() : ''} // Display formatted date
                        placeholder="Select Date"
                        handleChangeText={(selectedDate) => {
                            // Assume selectedDate is a valid Date string or Date object
                            const newDate = new Date(selectedDate); // Convert to Date object
                            if (!isNaN(newDate)) {
                                setDate(newDate); // Update the date state
                            }
                        }}
                        otherStyles="my-3"
                    />

                    <FormField
                        title="Time"
                        value={time}
                        placeholder="Select Time"
                        handleChangeText={(selectedTime) => {
                            setTime(selectedTime); // Update the time state
                        }}
                        otherStyles="my-3"
                    />

                    <FormField
                        title="Severity"
                        value={severity}
                        placeholder="Select Severity"
                        handleChangeText={setSeverity}
                        otherStyles="my-3" // Set the selected severity
                    />

                    <FormField
                        title="Note"
                        value={note}
                        placeholder="Enter your note here"
                        handleChangeText={(text) => setNote(text)}
                        otherStyles="my-3"
                    />

                    <CustomButton
                        title="Log"
                        handlePress={log}
                        containerStyles="mt-5"
                        isLoading={isSubmitting}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default symptoms