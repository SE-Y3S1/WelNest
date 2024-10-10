import React, { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, Alert } from 'react-native';
import SymptomCard from '../../components/symptomCard';
import { fetchAllSymptoms, deleteSymptom } from '../firebase/symptomService';

const symptomsList = () => {
    const [symptomsData, setSymptomsData] = useState([]);

    useEffect(() => {
        const unsubscribe = fetchAllSymptoms((data) => {
            setSymptomsData(data); // Update state with real-time data
        });

        // Clean up the listener on unmount
        return () => unsubscribe();
    }, []);

    const handleDeleteSymptom = (id) => {
        Alert.alert(
            "Delete Symptom",
            "Are you sure you want to delete this symptom?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",
                    onPress: async () => {
                        await deleteSymptom(id); // Call the delete function
                        setSymptomsData(prevSymptoms => prevSymptoms.filter(symptom => symptom.id !== id)); // Update state
                    },
                },
            ],
            { cancelable: false }
        );
    };


    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <View className="px-6">
                    {symptomsData.map((symptom, index) => (
                        <SymptomCard
                            key={index}
                            symptom={symptom.symptom}
                            note={symptom.note}
                            date={symptom.date}
                            time={symptom.time}
                            severity={symptom.severity}
                            onDelete={() => handleDeleteSymptom(symptom.id)}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default symptomsList