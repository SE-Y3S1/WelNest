import { View, Text, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateSymptom } from '../firebase/symptomService';
import { router, useLocalSearchParams } from 'expo-router';

const UpdateSymptom = () => {
    const { id, symptom: initialSymptom, date: initialDate, time: initialTime, severity: initialSeverity, note: initialNote } = useLocalSearchParams(); // Get params

    const [symptom, setSymptom] = useState(initialSymptom || '');
    const [date, setDate] = useState(initialDate || '');
    const [time, setTime] = useState(initialTime || '');
    const [severity, setSeverity] = useState(initialSeverity || '');
    const [note, setNote] = useState(initialNote || '');
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (initialSymptom) setSymptom(initialSymptom);
        if (initialDate) setDate((initialDate)); 
        if (initialTime) setTime(initialTime);
        if (initialSeverity) setSeverity(initialSeverity);
        if (initialNote) setNote(initialNote);
    }, [initialSymptom, initialDate, initialTime, initialSeverity, initialNote]);



    async function handleUpdate() {
        setSubmitting(true);

        try {
            const updatedSymptomData = {
                symptom,
                date,
                time,
                severity,
                note
            };

            await updateSymptom(id, updatedSymptomData); 
            router.replace('/symptomsList');
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
                    <Text className="text-2xl text-black font-semibold text-center -mt-5">Update Symptom</Text>
                    <FormField
                        placeholder="Enter your symptom here"
                        title="Symptom"
                        value={symptom}
                        handleChangeText={setSymptom}
                        otherStyles="mt-6"
                    />
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
                        title="Update Symptom"
                        handlePress={handleUpdate}
                        isLoading={isSubmitting}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default UpdateSymptom;
