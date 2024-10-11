import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Image } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter

const SleepTrack = () => {
  const router = useRouter(); // Get the router instance
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(true);
  const [isBedtimeEnabled, setIsBedtimeEnabled] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: '#fff',
      }}
    >
      {/* Header Section */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000',textAlign: 'center' }}>
          Sleep Tracker
        </Text>
        

        {/* Sleep Quality Section */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FFEEAD',
            padding: 20,
            borderRadius: 10,
            marginBottom: 20,
            marginTop:20,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
            Your sleep quality
          </Text>
          {/* Placeholder for Sleep Quality Graph */}
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: '#FF9500',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>80%</Text>
          </View>
        </View>
      </View>

     {/* Action Buttons */} 
<View 
  style={{ 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    marginBottom: 10 
  }}
>
  {[
    { title: 'Set Bedtime', icon: '🛌', route: '/setBedtime' },
    { title: 'Sleep Music', icon: '🎵', route: '/SleepMusic' },
    { title: 'Set Alarm', icon: '⏰', route: '/SetAlarm' },
    { title: 'Sleep Facts', icon: '💡', route: '/SleepFacts' },
  ].map((action, index) => (
    <TouchableOpacity
      key={index}
      style={{
        padding: 20,
        borderRadius: 12, // Smoother corners
        width: '47%',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#FF9500', // Background color for fallback
        shadowColor: '#000', // Subtle shadow for depth
        shadowOpacity: 0.9,
        shadowRadius: 8,
        shadowOffset: { width: 2, height: 4 },
        elevation: 6, // For Android shadow
      }}
      onPress={() => {
        router.push(action.route);
      }}
    >
      {/* Icon */}
      <Text style={{ fontSize: 32, color: '#000', marginBottom: 10 }}>{action.icon}</Text> 

      {/* Title */}
      <Text 
        style={{ 
          color: '#000', 
          fontSize: 16, 
          fontWeight: 'bold', 
          textAlign: 'center' 
        }}
      >
        {action.title}
      </Text>
    </TouchableOpacity>
  ))}
</View>

      {/* Today's Schedule Section */}
      <View style={{ marginTop: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Today’s schedule</Text>

        {/* Bed Time */}
        <View
          style={{
            backgroundColor: '#FFEEAD',
            padding: 15,
            borderRadius: 10,
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, marginRight: 10 }}>🛌</Text> 
            <View>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Bed time</Text>
              <Text style={{ fontSize: 14, color: '#888' }}>In 6 hours 22 mins</Text>
            </View>
          </View>
          <Switch value={isBedtimeEnabled} onValueChange={setIsBedtimeEnabled} />
        </View>

        {/* Alarm */}
        <View
          style={{
            backgroundColor: '#FFEEAD',
            padding: 15,
            borderRadius: 10,
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, marginRight: 10 }}>⏰</Text> 
            <View>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Alarm</Text>
              <Text style={{ fontSize: 14, color: '#888' }}>In 11 hours 22 mins</Text>
            </View>
          </View>
          <Switch value={isAlarmEnabled} onValueChange={setIsAlarmEnabled} />
        </View>
      </View>
    </ScrollView>
  );
};



export default SleepTrack;
