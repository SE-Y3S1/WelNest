// src/components/EditMealPlan.jsx

import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { getFirestore, doc } from 'firebase/firestore';
import { useRoute, useNavigation } from '@react-navigation/native';
import { updateMealPlan } from '../firebase/mealplanner'; // Import the updateMealPlan function
import app from '../../firebaseConfig';

const db = getFirestore(app);

const EditMealPlan = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { item, id } = route.params;

    const [formData, setFormData] = useState(item);
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value, index) => {
        if (name === 'items') {
            const updatedItems = [...formData.items];
            updatedItems[index] = value; 
            setFormData({ ...formData, items: updatedItems });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async () => {
        if (!formData.day || !formData.mealType || formData.items.some(item => !item) || !formData.quantity) {
            Alert.alert("Error", "Please fill in all fields for the meal plan.");
            return;
        }

        setLoading(true);

        try {
            await updateMealPlan(id, formData); // Use the updateMealPlan function
            Alert.alert("Success", "Meal plan updated successfully");
            navigation.goBack('added');
        } catch (error) {
            console.error("Error updating meal plan:", error);
            Alert.alert("Error", error.message || "There was an error updating the meal plan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 p-5 bg-[#F9FAFB]">
            <Text className="text-3xl font-bold mb-6 mt-10 text-center text-[#333]">Edit Meal Plan</Text>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <View className="mb-6">
                    <Text className="text-lg mb-2 font-bold text-[#000]">Day:</Text>
                    <TextInput
                        value={formData.day}
                        onChangeText={(value) => handleChange('day', value)}
                        className="h-12 border border-gray-400 rounded p-3 bg-white shadow"
                    />
                </View>

                <View className="mb-6">
                    <Text className="text-lg mb-2 font-bold text-[#000]">Meal Type:</Text>
                    <TextInput
                        value={formData.mealType}
                        onChangeText={(value) => handleChange('mealType', value)}
                        className="h-12 border border-gray-400 rounded p-3 bg-white shadow"
                    />
                </View>

                {formData.items.map((item, index) => (
                    <View key={index} className="mb-6">
                        <Text className="text-lg mb-2 font-bold text-[#000]">Item {index + 1}:</Text>
                        <TextInput
                            value={item}
                            onChangeText={(value) => handleChange('items', value, index)}
                            className="h-12 border border-gray-400 rounded p-3 bg-white shadow"
                        />
                    </View>
                ))}

                <View className="mb-6">
                    <Text className="text-lg mb-2 font-bold text-[#000]">Quantity:</Text>
                    <TextInput
                        value={formData.quantity.toString()}
                        onChangeText={(value) => handleChange('quantity', Number(value))}
                        className="h-12 border border-gray-400 rounded p-3 bg-white shadow"
                        keyboardType="numeric"
                    />
                </View>
            </ScrollView>

            <TouchableOpacity
                onPress={handleSubmit}
                className="bg-[#F59D00] rounded-xl py-3 px-4 self-center w-1/2 mb-0.5"
            >
                <Text className="text-white text-center text-xl font-bold">Save Changes</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#F59D00" style={{ marginTop: 20 }} />}
        </View>
    );
};

export default EditMealPlan;
