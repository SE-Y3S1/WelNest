import React, { useState } from 'react';
import { View, Text, Platform, Image, Alert, Keyboard, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addNutritionTip } from '../firebase/nutritionadd'; // Import the addNutritionTip function
import FormField from '../../components/FormField'; // Import your FormField component

const AddNutritionTip = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTip = async () => {
    if (!title || !description) {
      Alert.alert('Error', 'Both fields are required.');
      return;
    }

    try {
      await addNutritionTip({ title, description }); // Use the addNutritionTip function
      Alert.alert('Success', 'Tip added successfully!');
      setTitle('');
      setDescription('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add tip. Please try again later.');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="bg-[#FFDFA8] px-4 py-5 h-[1\28%] rounded-b-3xl">
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => navigation.navigate('nutrition')}>
                <Image source={require('../../assets/back-icon.png')} className="w-8 h-8 mt-12" />
              </TouchableOpacity>
              <Text className="text-2xl mt-1 font-bold flex-1 text-center mt-12">Add Nutrition Tips</Text>
            </View>
           
          </View>

          {/* Scrollable Content */}
          <ScrollView 
            contentContainerStyle={{ paddingBottom: 100 }} 
            keyboardShouldPersistTaps="handled"
          >
            <View className="mt-8 px-5 mt-5">
              <FormField
                title="Title"
                value={title}
                onChangeText={setTitle}
                placeholder="Add title..."
                otherStyles="my-3"
              />

              <FormField
                title="Description"
                value={description}
                onChangeText={setDescription}
                placeholder="Add description..."
                multiline={true}
                numberOfLines={4}
                inputStyle="h-[48%] text-left text-sm"
              />

              {/* Add Tip Button */}
              <TouchableOpacity 
                onPress={handleAddTip} 
                className="bg-[#F59D00] mt-8 p-4 rounded-lg"
              >
                <Text className="text-white text-center font-bold text-lg">Add Tip</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddNutritionTip;
