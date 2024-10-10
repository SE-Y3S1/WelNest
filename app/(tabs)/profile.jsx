import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();

  return (
    <ScrollView className="flex-1 bg-white">
      
      {/* Header */}
      <View className="items-center mt-10">
        {/* Profile Heading */}
        <Text className="text-2xl font-bold mt-5">Profile</Text>
        
        {/* Profile Picture */}
        <Image
          source={require('../../assets/dp.png')}  // Replace with actual image URL
          className="w-44 h-44 rounded-full mt-8"
        />
        {/* Name */}
        <Text className="text-2xl font-bold mt-4">Shambhavi Mishra</Text>
        {/* Role */}
        <Text className="text-gray-500 text-base mt-1">Food Blogger</Text>
      </View>

      {/* Options */}
      <View className="mt-8 px-8">
        {/* Edit Profile */}
        <TouchableOpacity
          className="flex-row items-center bg-[#FFE3CB] py-4 px-6 mb-4 rounded-xl "
          onPress={() => navigation.navigate('EditProfile')} // Replace with actual screen
        >
          <Image
            source={require('../../assets/user.png')} // Replace with your icon path
            className="w-6 h-6 mr-4"
          />
          <Text className="text-lg font-medium">Edit Profile</Text>
        </TouchableOpacity>

        {/* Added Meals & Tips */}
        <TouchableOpacity
          className="flex-row items-center bg-[#FFE3CB] py-4 px-6 mb-4 rounded-xl"
          onPress={() => navigation.navigate('Addedstuff')} // Replace with actual screen
        >
          <Image
            source={require('../../assets/saved.png')} // Replace with your icon path
            className="w-6 h-6 mr-4"
          />
          <Text className="text-lg font-medium">Added Meals & Tips</Text>
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity
          className="flex-row items-center bg-[#FFE3CB] py-4 px-6 mb-4 rounded-xl"
          onPress={() => navigation.navigate('Settings')} // Replace with actual screen
        >
          <Image
            source={require('../../assets/setting.png')} // Replace with your icon path
            className="w-6 h-6 mr-4"
          />
          <Text className="text-lg font-medium">Settings</Text>
        </TouchableOpacity>

        {/* Terms & Privacy Policy */}
        <TouchableOpacity
          className="flex-row items-center bg-[#FFE3CB] py-4 px-6 mb-4 rounded-xl"
          onPress={() => navigation.navigate('TermsPrivacy')} // Replace with actual screen
        >
          <Image
            source={require('../../assets/term.png')} // Replace with your icon path
            className="w-6 h-6 mr-4"
          />
          <Text className="text-lg font-medium">Terms & Privacy Policy</Text>
        </TouchableOpacity>

        {/* Log Out */}
        <TouchableOpacity
          className="flex-row items-center bg-[#FFE3CB] py-4 px-6 mb-4 rounded-xl"
          onPress={() => navigation.navigate('LogOut')} // Replace with actual log out functionality
        >
          <Image
            source={require('../../assets/icons/logout.png')} // Replace with your icon path
            className="w-6 h-6 mr-4"
          />
          <Text className="text-lg font-medium">Log Out</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default Profile;
