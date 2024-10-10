import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="mt-1 text-2xl font-bold">Home</Text>
      <Link href="/meal_planner" className="text-blue-500 text-lg mt-2">Meal Planner</Link>
      <Link href="/recipe" className="text-blue-500 text-lg mt-2">Recipe Screen</Link>
    </View>
  );
}

export default Home;
