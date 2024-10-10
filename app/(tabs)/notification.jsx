import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have this package installed

const NotificationScreen = () => {
  return (
    <View className="flex-1 bg-[#F9F9F9] justify-top items-center p-4 mt-10">
      <View className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <View className="flex-row items-center mb-4">
          <Ionicons name="notifications-outline" size={24} color="#FFA001" />
          <Text className="ml-2 text-2xl font-bold text-[#333]">Notifications</Text>
        </View>
        <Text className="text-gray-600">
          You have new notifications. Check them out!
        </Text>
        {/* Additional content can be added here */}
      </View>
    </View>
  );
};

export default NotificationScreen;
