import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';

const NutritionTips = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [selectedTip, setSelectedTip] = useState(null); // State to hold the selected tip

  const nutritionTips = [
    {
      title: 'Eat a Balanced Diet',
      description:
        'Ensure each meal includes a mix of proteins, carbohydrates, and healthy fats. A balanced diet provides essential nutrients to keep your body energized and healthy throughout the day.',
    },
    {
      title: 'Stay Hydrated',
      description:
        'Drink at least 8 glasses of water daily to stay hydrated. Proper hydration supports digestion, skin health, and overall bodily functions, helping you feel more alert and focused.',
    },
    {
      title: 'Limit Processed Foods',
      description:
        'Try to minimize processed foods that are high in sugar, salt, and unhealthy fats. Opt for whole, unprocessed foods like fresh vegetables, fruits, and lean meats to maintain optimal health.',
    },
    {
      title: 'Practice Portion Control',
      description:
        'Pay attention to portion sizes to avoid overeating. Using smaller plates and measuring servings can help you manage your intake and maintain a healthy weight without feeling deprived.',
    },
    {
      title: 'Incorporate Fiber Meals',
      description:
        'Add more fiber-rich foods like fruits, vegetables, and whole grains to your diet. Fiber aids digestion, supports heart health, and helps keep you fuller for longer, reducing unhealthy snacking.',
    },
  ];

  // Function to handle saving a tip
  const handleSaveTip = () => {
    if (selectedTip) {
      Alert.alert('Success', `Tip "${selectedTip.title}" saved successfully!`);
      setSelectedTip(null); // Clear selection after saving
    } else {
      Alert.alert('Error', 'Please select a tip to save.');
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header with Half Oval */}
      <View className="bg-[#FFDFA8] rounded-b-[80px] px-4 py-5 h-1/5">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/back-icon.png')} className="w-8 h-8" />
          </TouchableOpacity>
          <Text className="text-3xl font-bold">Nutrition Tips</Text>
          <TouchableOpacity>
            <Image source={require('../assets/add-icon.png')} className="w-9 h-9" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="mt-3">
          <View className="w-80 flex-row self-center bg-white shadow-md rounded-lg px-4 py-3 items-center">
            <Image source={require('../assets/search.png')} className="w-5 h-5 self-center mr-2" />
            <TextInput
              placeholder="Search Tips..."
              value={search}
              onChangeText={(text) => setSearch(text)}
              className="flex-1 text-gray-700"
            />
          </View>
        </View>
      </View>

      {/* Nutrition Tips List */}
      <ScrollView className="flex-1 px-4">
        {nutritionTips
          .filter(tip => tip.title.toLowerCase().includes(search.toLowerCase())) // Filter tips based on search input
          .map((tip, index) => (
            <View key={index} className={`flex-row justify-between items-center mb-4 rounded-xl p-4 ${selectedTip === tip ? 'bg-orange-200 border border-yellow-500' : 'bg-white shadow-md'}`}>
              
              {/* Text Container */}
              <View className="flex-1">
                <TouchableOpacity onPress={() => setSelectedTip(tip)}>
                  <Text className={`text-lg font-bold ${selectedTip === tip ? 'text-white' : 'text-gray-900'}`}>
                    {tip.title}
                  </Text>
                  <Text className={`text-gray-600 ${selectedTip === tip ? 'text-white' : 'text-gray-600'}`}>
                    {tip.description}
                    <Text className="text-[#FEA405]"> Read More...</Text>
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Add Button */}
              <TouchableOpacity className="w-6 h-6 bg-yellow-500 rounded-full items-center justify-center ml-3">
                <Text className="text-white font-bold self-center">+</Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>

      {/* Save Tip Button */}
      <TouchableOpacity className="bg-[#F59D00] p-4 rounded-2xl mx-10 my-4" onPress={handleSaveTip}>
        <Text className="text-white text-center font-bold text-xl">Save Tip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NutritionTips;
