import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; 
import { addMealPlan } from '../firebase/mealplanner';

const MealPlanner = () => {
    const navigation = useNavigation(); // Initialize navigation
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedMealType, setSelectedMealType] = useState('');
    const [mealItem1, setMealItem1] = useState('');
    const [mealItem2, setMealItem2] = useState('');
    const [mealItem3, setMealItem3] = useState('');
    const [quantity, setQuantity] = useState('');

    const [focusedField, setFocusedField] = useState(''); // To keep track of which input is focused

    const handleDayChange = (itemValue) => {
        if (itemValue !== 'Select') {
            setSelectedDay(itemValue);
        }
    };

    const handleMealTypeChange = (itemValue) => {
        if (itemValue !== 'Select') {
            setSelectedMealType(itemValue);
        }
    };

    // Function to save the meal plan
    const saveMealToFirebase = async () => {
        if (!selectedDay || !selectedMealType || !mealItem1 || !quantity) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        const mealData = {
            day: selectedDay,
            mealType: selectedMealType,
            items: [mealItem1, mealItem2, mealItem3],
            quantity,
        };

        try {
            await addMealPlan(mealData);
            Alert.alert('Success', 'Meal plan added successfully!', [{ text: 'OK' }]);

            // Reset fields after saving
            setSelectedDay('');
            setSelectedMealType('');
            setMealItem1('');
            setMealItem2('');
            setMealItem3('');
            setQuantity('');

            navigation.navigate('recipe');
        } catch (error) {
            Alert.alert('Error', 'Failed to add meal plan. Please try again.', [{ text: 'OK' }]);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View className="flex-1">
              

                <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="p-5 bg-white flex-1">
                    <Text className="text-2xl font-bold mb-3 mt-8">Daily Meal Planner</Text>
                    <Image
                        source={require('../../assets/meal_planning.png')}
                        className="w-full h-52 mb-4 rounded-xl"
                    />

                    {/* Day of the Week */}
                    <Text className="text-lg font-bold mb-2">Day of the Week:</Text>
                    <View className={`h-12 border ${focusedField === 'day' ? 'border-[#F59D00]' : 'border-gray-300'} rounded mb-4`}>
                        <Picker
                            selectedValue={selectedDay}
                            onValueChange={handleDayChange}
                            className="h-12 border-none rounded"
                            onFocus={() => setFocusedField('day')}
                            onBlur={() => setFocusedField('')}
                        >
                            <Picker.Item label="Select..." value="Select" enabled={false} />
                            <Picker.Item label="Monday" value="Monday" />
                            <Picker.Item label="Tuesday" value="Tuesday" />
                            <Picker.Item label="Wednesday" value="Wednesday" />
                            <Picker.Item label="Thursday" value="Thursday" />
                            <Picker.Item label="Friday" value="Friday" />
                            <Picker.Item label="Saturday" value="Saturday" />
                            <Picker.Item label="Sunday" value="Sunday" />
                        </Picker>
                    </View>

                    {/* Meal Type */}
                    <Text className="text-lg font-bold mb-2">Meal Type:</Text>
                    <View className={`h-12 border ${focusedField === 'mealType' ? 'border-[#F59D00]' : 'border-gray-300'} rounded mb-4`}>
                        <Picker
                            selectedValue={selectedMealType}
                            onValueChange={handleMealTypeChange}
                            className="h-12 border-none rounded"
                            onFocus={() => setFocusedField('mealType')}
                            onBlur={() => setFocusedField('')}
                        >
                            <Picker.Item label="Select..." value="Select" enabled={false} />
                            <Picker.Item label="Breakfast" value="Breakfast" />
                            <Picker.Item label="Lunch" value="Lunch" />
                            <Picker.Item label="Dinner" value="Dinner" />
                        </Picker>
                    </View>

                    {/* Meal Item 1 */}
                    <Text className="text-lg font-bold mb-2">Meal Item 1:</Text>
                    <TextInput
                        value={mealItem1}
                        onChangeText={setMealItem1}
                        onFocus={() => setFocusedField('mealItem1')}
                        onBlur={() => setFocusedField('')}
                        className={`h-10 border ${focusedField === 'mealItem1' ? 'border-[#F59D00]' : 'border-gray-300'} rounded mb-4`}
                    />

                    {/* Meal Item 2 */}
                    <Text className="text-lg font-bold mb-2">Meal Item 2:</Text>
                    <TextInput
                        value={mealItem2}
                        onChangeText={setMealItem2}
                        onFocus={() => setFocusedField('mealItem2')}
                        onBlur={() => setFocusedField('')}
                        className={`h-10 border ${focusedField === 'mealItem2' ? 'border-[#F59D00]' : 'border-gray-300'} rounded mb-4`}
                    />

                    {/* Meal Item 3 */}
                    <Text className="text-lg font-bold mb-2">Meal Item 3:</Text>
                    <TextInput
                        value={mealItem3}
                        onChangeText={setMealItem3}
                        onFocus={() => setFocusedField('mealItem3')}
                        onBlur={() => setFocusedField('')}
                        className={`h-10 border ${focusedField === 'mealItem3' ? 'border-[#F59D00]' : 'border-gray-300'} rounded mb-4`}
                    />

                    {/* Quantity */}
                    <Text className="text-lg font-bold mb-2">Quantity:</Text>
                    <TextInput
                        value={quantity}
                        onChangeText={setQuantity}
                        onFocus={() => setFocusedField('quantity')}
                        onBlur={() => setFocusedField('')}
                        className={`h-10 border ${focusedField === 'quantity' ? 'border-[#F59D00]' : 'border-gray-300'} rounded mb-4`}
                        keyboardType="numeric"
                    />

                    {/* Add Meal button */}
                    <TouchableOpacity
                        onPress={saveMealToFirebase}
                        className="bg-[#F59D00] rounded-xl py-4 px-4 self-center w-3/4"
                    >
                        <Text className="text-white text-center text-xl font-bold">Add Meal</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default MealPlanner;
