import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import app from '../../firebaseConfig';

const NutritionTips = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [selectedTip, setSelectedTip] = useState(null);
  const [userTips, setUserTips] = useState([]);
  const [nutritionTips, setNutritionTips] = useState([]);

 

  // Fetch nutrition tips from Firestore on mount
  useEffect(() => {
    const db = getFirestore(app);
    const tipsCollection = collection(db, 'nutritionTips');

    const unsubscribe = onSnapshot(tipsCollection, (snapshot) => {
      const tipsList = snapshot.docs.map(doc => ({ ...doc.data() }));
      setNutritionTips(tipsList);
    });

    return () => unsubscribe();
  }, []);

  // Function to handle saving a tip
  const handleSaveTip = () => {
    if (selectedTip) {
      Alert.alert('Success', `Tip "${selectedTip.title}" saved successfully!`);
      setSelectedTip(null);
    } else {
      Alert.alert('Error', 'Please select a tip to save.');
    }
  };

  // Combine all nutrition tips for display
  const combinedNutritionTips = [

    ...userTips,
    ...nutritionTips,
  ];

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <View className="bg-[#FFDFA8] rounded-b-[50px] px-4 py-5 h-[24%]">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => navigation.navigate('recipe_detail')}>
            <Image source={require('../../assets/back-icon.png')} className="w-8 h-8 mt-10" />
          </TouchableOpacity>
          <Text className="text-3xl font-bold mt-12">Nutrition Tips</Text>
          <TouchableOpacity onPress={() => navigation.navigate('nutrition_add')}>
            <Image source={require('../../assets/add-icon.png')} className="w-9 h-9 mt-10" />
          </TouchableOpacity>
        </View>
        <View className="mt-3">
          <View className="w-full max-w-md flex-row self-center bg-white shadow-md rounded-lg px-4 py-3 items-center">
            <Image source={require('../../assets/search.png')} className="w-5 h-5 self-center mr-2" />
            <TextInput
              placeholder="Search Tips...."
              value={search}
              onChangeText={(text) => setSearch(text)}
              className="flex-1 text-gray-700"
              onFocus={() => setSelectedTip(null)}
            />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4">
        {combinedNutritionTips
          .filter(tip => tip.title.toLowerCase().includes(search.toLowerCase()))
          .map((tip, index) => (
            <View key={index} className={`mb-4 rounded-xl p-4 border ${selectedTip === tip ? 'border-yellow-500' : 'border-gray-300'} ${selectedTip === tip ? 'bg-orange-200' : 'bg-white shadow-md'}`}>
              <TouchableOpacity className="absolute top-3 right-3 w-6 h-6 bg-yellow-500 rounded-full items-center justify-center">
                <Text className="text-white font-bold self-center">+</Text>
              </TouchableOpacity>
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
          ))}
      </ScrollView>

      <TouchableOpacity className="bg-[#F59D00] p-4 rounded-2xl mx-10 my-4" onPress={handleSaveTip}>
        <Text className="text-white text-center font-bold text-xl">Save Tip</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default NutritionTips;
