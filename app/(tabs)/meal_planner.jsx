import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Correct Picker import

const MealPlanner = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('');
  const [mealItem1, setMealItem1] = useState('');
  const [mealItem2, setMealItem2] = useState('');
  const [mealItem3, setMealItem3] = useState('');
  const [quantity, setQuantity] = useState('');

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

  return (
    <View className="flex-1">
      <View className="bg-[#F59D00] p-4 shadow-md rounded-xl mt-14">
        <Text className="text-2xl font-bold text-center text-black">Wellness Pioneers</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="p-5 bg-white flex-1">
        <Text className="text-2xl font-bold my-1">Daily Meal Planner</Text>
        <Image
          source={require('../../assets/meal_planning.png')} // Correct the path to your image
          className="w-full h-52 mb-4 rounded-xl"
        />

        <View className="mb-4 flex-row items-center shadow-md">
          <Text className="text-lg mb-2 font-bold flex-1">Day of the Week:</Text>
          <View className="h-12 border border-gray-300 rounded flex-2 w-full max-w-[57.5%] shadow-md">
            <Picker
              selectedValue={selectedDay}
              onValueChange={handleDayChange}
              className="h-12 border-none rounded px-2"
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
        </View>

        <View className="mb-4 flex-row items-center shadow-md">
          <Text className="text-lg mb-2 font-bold flex-1">Meal Type:</Text>
          <View className="h-12 border border-gray-300 rounded flex-2 w-full max-w-[57.5%] shadow-md">
            <Picker
              selectedValue={selectedMealType}
              onValueChange={handleMealTypeChange}
              className="h-12 border-none rounded px-2"
            >
              <Picker.Item label="Select..." value="Select" enabled={false} />
              <Picker.Item label="Breakfast" value="Breakfast" />
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Dinner" value="Dinner" />
            </Picker>
          </View>
        </View>

        <View className="mb-4 flex-row items-center">
          <Text className="text-lg mb-2 font-bold flex-1">Meal Item 1:</Text>
          <TextInput
            value={mealItem1}
            onChangeText={setMealItem1}
            className="h-10 border border-gray-300 rounded flex-2 w-full max-w-[57.5%]"
          />
        </View>

        <View className="mb-4 flex-row items-center shadow-md">
          <Text className="text-lg mb-2 font-bold flex-1">Meal Item 2:</Text>
          <TextInput
            value={mealItem2}
            onChangeText={setMealItem2}
            className="h-10 border border-gray-300 rounded flex-2 w-full max-w-[57.5%]"
          />
        </View>

        <View className="mb-4 flex-row items-center">
          <Text className="text-lg mb-2 font-bold flex-1">Meal Item 3:</Text>
          <TextInput
            value={mealItem3}
            onChangeText={setMealItem3}
            className="h-10 border border-gray-300 rounded flex-2 w-full max-w-[57.5%]"
          />
        </View>

        <View className="mb-4 flex-row items-center">
          <Text className="text-lg mb-2 font-bold flex-1">Quantity:</Text>
          <TextInput
            value={quantity}
            onChangeText={setQuantity}
            className="h-10 border border-gray-300 rounded flex-2 w-full max-w-[57.5%]"
            keyboardType="numeric"
          />
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white">
        <TouchableOpacity
          onPress={() => console.log("Meal added")}
          className="bg-[#F59D00] rounded-xl py-3 px-4 self-center w-1/2"
        >
          <Text className="text-white text-center text-xl font-bold">Add Meal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MealPlanner;
