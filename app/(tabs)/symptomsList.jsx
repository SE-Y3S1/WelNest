import React, { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import SymptomCard from '../../components/symptomCard';
import { fetchAllSymptoms, deleteSymptom } from '../firebase/symptomService';
import { router } from 'expo-router';
import { icons } from '../../constants';

const symptomsList = () => {
    const [symptomsData, setSymptomsData] = useState([]);

    useEffect(() => {
        const unsubscribe = fetchAllSymptoms((data) => {
            setSymptomsData(data); 
        });
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
                        await deleteSymptom(id); 
                        setSymptomsData(prevSymptoms => prevSymptoms.filter(symptom => symptom.id !== id));
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleUpdateSymptom = (symptom) => {
        router.push({
            pathname: '/updateSymptom',
            params: {
                id: symptom.id,
                symptom: symptom.symptom,
                note: symptom.note,
                date: symptom.date,
                time: symptom.time,
                severity: symptom.severity,
            },
        });
    };


    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <View className="w-full px-4 mt-16">
                <Text className="text-2xl text-black font-psemibold mb-5">Symptoms</Text>
                <View className="items-center">
                    {symptomsData.map((symptom, index) => (
                        <SymptomCard
                            key={index}
                            symptom={symptom.symptom}
                            note={symptom.note}
                            date={symptom.date}
                            time={symptom.time}
                            severity={symptom.severity}
                            onDelete={() => handleDeleteSymptom(symptom.id)}
                            onEdit={() => handleUpdateSymptom(symptom)}
                        />
                    ))}
                </View>
                </View>
            </ScrollView>
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
    )
}

export default symptomsList