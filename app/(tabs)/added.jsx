// src/components/Added.jsx

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import app from '../../firebaseConfig';

const db = getFirestore(app);

const Added = () => {
    const navigation = useNavigation();
    const [mealPlans, setMealPlans] = useState([]);
    const [nutritionTips, setNutritionTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching meal plans with onSnapshot
    useEffect(() => {
        const unsubscribeMealPlans = onSnapshot(
            collection(db, 'mealPlans'),
            (snapshot) => {
                const mealPlansData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setMealPlans(mealPlansData);
                setLoading(false);
            },
            (error) => {
                setError("Error fetching meal plans.");
                console.error("Error fetching meal plans:", error);
                setLoading(false);
            }
        );

        // Cleanup function
        return () => unsubscribeMealPlans();
    }, []);

    // Fetching nutrition tips with onSnapshot
    useEffect(() => {
        const unsubscribeNutritionTips = onSnapshot(
            collection(db, 'nutritionTips'),
            (snapshot) => {
                const nutritionTipsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setNutritionTips(nutritionTipsData);
                setLoading(false);
            },
            (error) => {
                setError("Error fetching nutrition tips.");
                console.error("Error fetching nutrition tips:", error);
                setLoading(false);
            }
        );

        // Cleanup function
        return () => unsubscribeNutritionTips();
    }, []);

    // Delete meal plan
    const handleDeleteMealPlan = async (id) => {
        try {
            await deleteDoc(doc(db, 'mealPlans', id));
        } catch (error) {
            console.error("Error deleting meal plan:", error);
        }
    };

    // Delete nutrition tip
    const handleDeleteNutritionTip = async (id) => {
        try {
            await deleteDoc(doc(db, 'nutritionTips', id));
        } catch (error) {
            console.error("Error deleting nutrition tip:", error);
        }
    };

    // Confirm deletion for meal plans
    const confirmDeleteMealPlan = (id) => {
        Alert.alert(
            "Delete Meal Plan",
            "Are you sure you want to delete this meal plan?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => handleDeleteMealPlan(id) }
            ]
        );
    };

    // Confirm deletion for nutrition tips
    const confirmDeleteNutritionTip = (id) => {
        Alert.alert(
            "Delete Nutrition Tip",
            "Are you sure you want to delete this nutrition tip?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => handleDeleteNutritionTip(id) }
            ]
        );
    };

    // Navigate to edit screen with the item data
    const navigateToEditItem = (item) => {
        navigation.navigate('edititem', { item, id: item.id }); // Pass the item data and ID to the edit screen
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#F59D00" />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text className="text-red-500 text-lg">{error}</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }} className="bg-white flex-1 mt-10">
            <Text className="text-3xl font-bold text-[#F59D00] mb-6 text-center">Your Added Meal Plans & Nutrition Tips</Text>
            
            <Text className="text-2xl font-bold mb-4 text-[#26221A]">Added Meal Plans</Text>
            {mealPlans.length > 0 ? (
                mealPlans.map((meal) => (
                    <View key={meal.id} className="mb-4 p-4 bg-[#FFDFA8] border border-gray-300 rounded-lg shadow-md relative">
                        <TouchableOpacity 
                            onPress={() => confirmDeleteMealPlan(meal.id)} 
                            className="absolute top-2 right-2"
                        >
                            <Image source={require('../../assets/delete.png')} className="w-6 h-6" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navigateToEditItem(meal)} 
                            className="absolute top-2 right-10" // Adjusted position to the right of the delete button
                        >
                            <Image source={require('../../assets/edit.png')} className="w-6 h-6" />
                        </TouchableOpacity>
                        <Text className="font-bold text-black">Day: {meal.day}</Text>
                        <Text className="text-black">Meal Type: {meal.mealType}</Text>
                        {meal.items.map((item, index) => (
                            <Text key={index} className="text-black">{`Item ${index + 1}: ${item}`}</Text>
                        ))}
                        <Text className="text-black">Quantity: {meal.quantity}</Text>
                    </View>
                ))
            ) : (
                <Text className="text-gray-500">No meal plans added yet.</Text>
            )}

            <Text className="text-2xl font-bold mb-4 mt-6 text-[#26221A]">Added Nutrition Tips</Text>
            {nutritionTips.length > 0 ? (
                nutritionTips.map((tip) => (
                    <View key={tip.id} className="mb-4 p-4 bg-[#FFAD1D] border border-gray-300 rounded-lg shadow-md relative">
                        <TouchableOpacity 
                            onPress={() => confirmDeleteNutritionTip(tip.id)} 
                            className="absolute top-2 right-2"
                        >
                            <Image source={require('../../assets/delete.png')} className="w-6 h-6" />
                        </TouchableOpacity>
                        <Text className="font-bold text-black">Title: {tip.title}</Text>
                        <Text className="text-black">Description: {tip.description}</Text>
                    </View>
                ))
            ) : (
                <Text className="text-gray-500">No nutrition tips added yet.</Text>
            )}
        </ScrollView>
    );
};

export default Added;
