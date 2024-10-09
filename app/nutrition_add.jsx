import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddNutritionTip = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTip = () => {
    if (!title || !description) {
      Alert.alert('Error', 'Both fields are required.');
      return;
    }

    Alert.alert('Success', 'Tip added successfully!');
    setTitle('');
    setDescription('');
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white" behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-white">
          <View className="bg-[#FFDFA8] px-4 py-5 h-[20%] rounded-b-3xl">
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../assets/back-icon.png')} className="w-6 h-6 mt-2" />
              </TouchableOpacity>
              <Text className="text-2xl mt-1 font-bold flex-1 text-center">Add Nutrition Tips</Text>
            </View>
            <Text className="text-center mt-6 text-lg font-semibold">
              Share your knowledge for healthier living and well-being!
            </Text>
          </View>

          <View className="mt-8 px-5">
            <Text className="text-lg font-semibold">Title</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Add title..."
              className="bg-gray-100 p-4 mt-2 rounded-lg shadow-sm text-gray-700"
            />

            <Text className="text-lg font-semibold mt-6">Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Description...."
              className="bg-gray-100 p-3 pt-0 mt-2 rounded-lg shadow-sm text-gray-700 h-[48%] text-left text-sm" // Ensure typing starts from top left
              placeholderTextColor="gray"
              multiline={true}
              numberOfLines={4}
            />

            <TouchableOpacity onPress={handleAddTip} className="bg-[#F59D00] mt-8 p-4 rounded-lg">
              <Text className="text-white text-center font-bold text-lg">Add Tip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddNutritionTip;
