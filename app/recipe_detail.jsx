import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailRecipeScreen = () => {
  const navigation = useNavigation(); // Use the hook for navigation
  const recipeName = 'Chicken Alfredo Pasta'; // Hardcoded recipe for demonstration

  // Dummy data for demonstration
  const recipeDetails = {
    'Chicken Alfredo Pasta': {
      prepTime: '40 min',
      likes: 273,
      author: 'Elena Shelby',
      description: 'Chicken Alfredo Pasta is a creamy dish with tender chicken strips and fettuccine in a rich Parmesan sauce.',
      ingredients: [
        '2 boneless, skinless chicken breasts',
        '8 oz fettuccine pasta',
        '1 tablespoon olive oil',
        '3 cloves garlic, minced',
      ],
    },
  };

  const recipe = recipeDetails[recipeName];

  return (
    <View className="flex-1 bg-white">
      {/* Recipe Image */}
      <Image
        source={require('../assets/chicken-alfredo.png')} // Replace with your image path
        className="w-5/6 h-[30%] mb-4 rounded-3xl self-center"
      />

      {/* Recipe Details */}
      <View className="bg-customPink p-5 rounded-t-3xl mt-0.1 flex-1">
        {/* Recipe Name */}
        <Text className="text-2xl font-bold text-customDarkBlue mb-2">{recipeName}</Text>

        {/* Food Prep Time and Likes */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-gray-600">Food Prep Time</Text>
          <Text className="text-gray-600 text-center">{recipe.prepTime}</Text>
        </View>

        {/* Author and Likes */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Image
              source={require('../assets/author.png')} // Replace with your author image
              className="w-8 h-8 rounded-full"
            />
            <Text className="ml-2 text-customDarkBlue font-bold">{recipe.author}</Text>
          </View>

          <View className="w-10 h-1 bg-gray-400 my-2 self-center rounded" />

          <View className="flex-row items-center">
            <View className="w-7 h-7 bg-green-500 rounded-full mr-3" />
            <Text className="text-gray-700">{recipe.likes} Likes</Text>
          </View>
        </View>

        <View className="w-5/6 h-0.5 bg-black my-2 self-center" />

        {/* Description */}
        <View className="mb-4">
          <Text className="text-lg font-bold text-customDarkBlue mb-2">Description</Text>
          <Text className="text-gray-600">
            {recipe.description}
            <Text className="font-bold text-orange-500"> Read More...</Text>
          </Text>
        </View>

        <View className="w-5/6 h-0.5 bg-black my-2 self-center" />

        {/* Ingredients */}
        <View>
          <Text className="text-lg font-bold text-customDarkBlue mb-2">Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} className="flex-row items-center mb-2">
              <View className="w-4 h-4 bg-green-500 rounded-full mr-2" />
              <Text className="text-gray-700">{ingredient}</Text>
            </View>
          ))}
        </View>

        {/* Nutrient Tips Button */}
        <TouchableOpacity
          className="bg-[#F59D00] rounded-xl py-3 px-6 mt-3 self-center w-1/2"
          onPress={() => navigation.navigate('nutrition')} // Navigate to the nutrition screen
        >
          <Text className="text-white text-center text-xl font-bold">Nutrient Tips</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailRecipeScreen;
