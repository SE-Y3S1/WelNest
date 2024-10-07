import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Correct Picker import

const MealPlanner = () => {
  const [selectedDay, setSelectedDay] = useState('Select');
  const [selectedMealType, setSelectedMealType] = useState('Select');
  const [mealItem1, setMealItem1] = useState('');
  const [mealItem2, setMealItem2] = useState('');
  const [mealItem3, setMealItem3] = useState('');
  const [quantity, setQuantity] = useState('');

  return (
    <View className="p-5 flex-1 bg-white">
      <Text className="text-2xl font-bold text-left my-5">Daily Meal Planner</Text>
      <Image
        source={require('../assets/meal_planning.png')} // Correct the path to your image
        className="w-full h-52 mb-5"
      />

      <View className="mb-4">
        <Text className="text-lg mb-2 font-bold">Day of the Week:</Text>
        <Picker
          selectedValue={selectedDay}
          onValueChange={(itemValue) => setSelectedDay(itemValue)}
          className="h-12 border border-gray-300 rounded"
        >
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
          <Picker.Item label="Sunday" value="Sunday" />
        </Picker>
      </View>

      <View className="mb-4">
        <Text className="text-lg mb-2 font-bold">Meal Type:</Text>
        <Picker
          selectedValue={selectedMealType}
          onValueChange={(itemValue) => setSelectedMealType(itemValue)}
          className="h-12 border border-gray-300 rounded"
        >
          <Picker.Item label="Breakfast" value="Breakfast" />
          <Picker.Item label="Lunch" value="Lunch" />
          <Picker.Item label="Dinner" value="Dinner" />
        </Picker>
      </View>

      <View className="mb-4">
        <Text className="text-lg mb-2 font-bold">Meal Item 1:</Text>
        <TextInput
          value={mealItem1}
          onChangeText={setMealItem1}
          className="h-10 border border-gray-300 rounded px-2"
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg mb-2 font-bold">Meal Item 2:</Text>
        <TextInput
          value={mealItem2}
          onChangeText={setMealItem2}
          className="h-10 border border-gray-300 rounded px-2"
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg mb-2 font-bold">Meal Item 3:</Text>
        <TextInput
          value={mealItem3}
          onChangeText={setMealItem3}
          className="h-10 border border-gray-300 rounded px-2"
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg mb-2 font-bold">Quantity:</Text>
        <TextInput
          value={quantity}
          onChangeText={setQuantity}
          className="h-10 border border-gray-300 rounded px-2"
          keyboardType="numeric"
        />
      </View>

      <Button title="Add Meal" onPress={() => console.log("Meal added")} />
    </View>
  );
};

export default MealPlanner;
