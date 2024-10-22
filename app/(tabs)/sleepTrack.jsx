import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter

const SleepTrack = () => {
  const router = useRouter(); // Get the router instance
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(true);
  const [isBedtimeEnabled, setIsBedtimeEnabled] = useState(false);

  return (
    <SafeAreaView className="h=full bg-white">
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: '#fff',
      }}
    >
      <View className="bg-white w-full h-full justify-center px-4 my-4">

        {/* Header Section */}
        <View style={{ marginBottom: 20 }}>
          <Text className="text-2xl text-black font-pbold mt-10 text-center">
            Sleep Tracker
          </Text>



        </View>

        {/* Action Buttons */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: 20,
            marginTop: 20
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
                marginBottom: 30,
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
        <View style={{ marginTop: 0 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Today’s schedule</Text>

          {/* Bed Time */}
          <View
            style={{
              backgroundColor: '#FFEEAD',
              padding: 25,
              borderRadius: 10,
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 30
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
              padding: 25,
              borderRadius: 10,
              marginBottom: 40,
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
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};



export default SleepTrack;
