import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getFirestore, onSnapshot, query, limit } from 'firebase/firestore'; // Ensure the correct Firestore imports
import app from '../../firebaseConfig'; // Ensure the correct path to your firebaseConfig

const NutritionTips = () => {
  const navigation = useNavigation(); // Use useNavigation hook
  const [search, setSearch] = useState('');
  const [selectedTip, setSelectedTip] = useState(null); // State to hold the selected tip
  const [userTips, setUserTips] = useState([]); // State to hold user-added tips
  const [nutritionTips, setNutritionTips] = useState([]); // State to hold nutrition tips from Firestore

  // Predefined nutrition tips
  const predefinedNutritionTips = [
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

  // Fetch nutrition tips from Firestore when the component mounts
  useEffect(() => {
    const db = getFirestore(app);
    const tipsCollection = collection(db, 'nutritionTips');
    
    // Use Firestore's query and limit to limit the number of tips fetched (optional)
    const tipsQuery = query(tipsCollection, limit(10)); // Adjust the limit as per your needs

    // Use Firestore's onSnapshot to listen to real-time updates
    const unsubscribe = onSnapshot(tipsQuery, (snapshot) => {
      const tipsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNutritionTips(tipsList); // Update state with new data
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []); // Empty dependency array means this effect runs only once when component mounts

  // Function to handle saving a tip
  const handleSaveTip = () => {
    if (selectedTip) {
      Alert.alert('Success', `Tip "${selectedTip.title}" saved successfully!`);
      setUserTips([...userTips, selectedTip]); // Add selected tip to user tips
      setSelectedTip(null); // Clear selection after saving
    } else {
      Alert.alert('Error', 'Please select a tip to save.');
    }
  };

  // Combine predefined tips with user-added tips and Firestore tips
  const combinedNutritionTips = [
    ...predefinedNutritionTips,
    ...userTips,
    ...nutritionTips,
  ];

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80} // Adjust this offset as needed
    >
      {/* Header with Half Oval */}
      <View className="bg-[#FFDFA8] rounded-b-[50px] px-4 py-5 h-[25%] ">
        <View className="flex-row items-center justify-between">
          {/* Back Icon */}
          <TouchableOpacity onPress={() => navigation.navigate('recipe_detail')}>
            <Image source={require('../../assets/back-icon.png')} className="w-8 h-8 mt-10" />
          </TouchableOpacity>
          <Text className="text-3xl font-bold mt-12">Nutrition Tips</Text>
          <TouchableOpacity onPress={() => navigation.navigate('nutrition_add')}>
            <Image source={require('../../assets/add-icon.png')} className="w-9 h-9 mt-10" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="mt-3">
          <View className="w-full max-w-md flex-row self-center bg-white shadow-md rounded-lg px-4 py-3 items-center">
            <Image source={require('../../assets/search.png')} className="w-5 h-5 self-center mr-2" />
            <TextInput
              placeholder="Search Tips...."
              value={search}
              onChangeText={(text) => setSearch(text)}
              className="flex-1 text-gray-700"
              onFocus={() => setSelectedTip(null)} // Clear selection when searching
            />
          </View>
        </View>
      </View>

      {/* Nutrition Tips List */}
      <ScrollView className="flex-1 px-4">
        {combinedNutritionTips.length === 0 ? (
          <Text className="text-center text-gray-500 mt-4">No nutrition tips available.</Text>
        ) : (
          combinedNutritionTips
            .filter(tip => tip.title.toLowerCase().includes(search.toLowerCase())) // Filter tips based on search input
            .map((tip, index) => (
              <View key={index} className={`mb-4 rounded-xl p-4 border ${selectedTip === tip ? 'border-yellow-500' : 'border-gray-300'} ${selectedTip === tip ? 'bg-orange-200' : 'bg-white shadow-md'}`}>
                {/* Add Button positioned in the top right corner */}
                <TouchableOpacity className="absolute top-3 right-3 w-6 h-6 bg-yellow-500 rounded-full items-center justify-center">
                  <Text className="text-white font-bold self-center">+</Text>
                </TouchableOpacity>
                
                {/* Text Container */}
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
            ))
        )}
      </ScrollView>

      {/* Save Tip Button */}
      <TouchableOpacity className="bg-[#F59D00] p-4 rounded-2xl mx-10 my-4" onPress={handleSaveTip} activeOpacity={0.8}>
        <Text className="text-white text-center font-bold text-xl">Save Tip</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default NutritionTips;
