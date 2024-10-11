import { View, Text, ScrollView, Alert } from 'react-native'
import React from 'react'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react';
import { addSymptom } from '../firebase/symptomService'
import { router } from 'expo-router'

const symptomForm = () => {
    const [symptom, setSymptom] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [severity, setSeverity] = useState('');
    const [note, setNote] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);


    async function log() {
        if (!symptom || !date || !time || !severity) {
            Alert.alert('Error', 'All fields must be filled out');
            return;
        }


        setSubmitting(true);

        try {
            const symptomData = {
                symptom,
                date,
                time,
                severity,
                note
            };

            await addSymptom(symptomData);

            setSymptom('');
            setDate(new Date());
            setTime('');
            setSeverity('');
            setNote('');

           router.push('symptomsList');
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
                    <Text className="text-2xl text-black font-pbold -mt-5 text-center">Log a Symptom</Text>
                    <FormField
                        placeholder="Enter your symptom here"
                        title="Symptom"
                        value={symptom}
                        handleChangeText={setSymptom}
                        otherStyles="mt-6" />
                    <FormField
                        title="Date"
                        value={date} 
                        placeholder="Select Date"
                        handleChangeText={(selectedDate) => {
                                setDate(selectedDate); 
                        }}
                        otherStyles="my-3"
                    />


                    <FormField
                        title="Time"
                        value={time}
                        placeholder="Select Time"
                        handleChangeText={(selectedTime) => {
                            setTime(selectedTime); 
                        }}
                        otherStyles="my-3"
                    />

                    <FormField
                        title="Severity"
                        value={severity}
                        placeholder="Select Severity"
                        handleChangeText={setSeverity}
                        otherStyles="my-3"
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
                        isLoading={isSubmitting}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default symptomForm