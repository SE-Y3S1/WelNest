import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecipeScreen = () => {
  const navigation = useNavigation(); // Access navigation instance

  // State to track the selected recipe
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const recipes = [
    { name: 'Creamy Mushroom Risotto', kcal: '219 kcal', color: 'bg-white', textColor: 'text-gray-800' },
    { name: 'Vegetable Omelet Sandwich', kcal: '300 kcal', color: 'bg-white', textColor: 'text-gray-800' },
    { name: 'Chicken Alfredo Pasta', kcal: '229 kcal', color: 'bg-white', textColor: 'text-gray-900' },
    { name: 'Thai Peanut Noodles', kcal: '219 kcal', color: 'bg-white', textColor: 'text-gray-800' },
    { name: 'Quinoa Salad with Avocado', kcal: '250 kcal', color: 'bg-white', textColor: 'text-gray-800' },

  ];

  // Function to handle recipe selection
  const handleSelectRecipe = (recipeName) => {
    setSelectedRecipe(recipeName); // Update the selected recipe state
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#F59D00] p-4 shadow-md rounded-xl mt-14">
        <Text className="text-2xl font-bold text-center text-black">Wellness Pioneers</Text>
      </View>

      {/* Scrollable Recipe Suggestions */}
      
        <Text className="text-xl font-bold text-left mb-3 ml-5 mt-5">Recipe Suggestions</Text>

        {/* Image */}
        <Image
          source={require('../../assets/recipes.png')} // Replace with your image
          className="w-[90%] h-40 rounded-xl mb-5 self-center"
          resizeMode="cover"
        />
           <ScrollView className="flex-1 px-3 py-3">

        {/* Recipe List */}
        {recipes.map((recipe, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelectRecipe(recipe.name)} // Set recipe as selected on press
            className={`flex-row items-center justify-between p-3 mb-3 rounded-lg border ${
              selectedRecipe === recipe.name ? 'bg-orange-200 border-yellow-500' : 'border-gray-300'
            }`} // Added border here
          >
            <View>
              <Text className={`text-lg font-bold ${recipe.textColor}`}>
                {recipe.name}
              </Text>
              {/* kcal with green dot */}
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                <Text className="text-sm text-gray-500">{recipe.kcal}</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-yellow-500 w-10 h-10 rounded-full flex items-center justify-center">
              <Text className="text-white text-xl font-bold">+</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Fixed View Recipe Button */}
      <View className="p-4 bg-white">
        <TouchableOpacity
          className="bg-[#F59D00] p-4 rounded-full"
          onPress={() => {
            if (selectedRecipe) {
              navigation.navigate('recipe_detail', { recipeName: selectedRecipe }); // Navigate to DetailRecipeScreen
            } else {
              alert('Please select a recipe!');
            }
          }}
        >
          <Text className="text-white text-center font-bold text-lg">View Recipe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecipeScreen;