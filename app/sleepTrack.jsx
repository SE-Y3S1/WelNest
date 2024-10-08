import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter

const SleepTrack = () => {
  const router = useRouter(); // Get the router instance

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: '#fff',
      }}
    >
      {/* Title Section */}
      <View style={{ marginBottom: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000' }}>
          Sleep Tracker
        </Text>
      </View>

      {/* Sleep Duration Buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
        {['5h', '6h', '3h', '3h', '3h', '3h', '5h'].map((duration, index) => (
          <View key={index} style={{ alignItems: 'center', backgroundColor: '#FFD700', padding: 10, borderRadius: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>{duration}</Text>
            <Text style={{ fontSize: 14, color: '#000' }}>Sn</Text>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 }}>
        {['Set bedtime', 'Sleep music', 'Set Alarm', 'Sleep facts'].map((action, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: '#FF9500',
              padding: 20,
              borderRadius: 10,
              width: '45%',
              alignItems: 'center',
              marginBottom: 20,
            }}
            onPress={() => {
              if (action === 'Set bedtime') {
                router.push('/setBedtime'); // Use router.push to navigate to Set Bedtime screen
              }
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{action}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Today's Schedule */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Today schedule</Text>

        {/* Bed Time */}
        <View style={{ backgroundColor: '#f9f9f9', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Bed time</Text>
          <Text style={{ fontSize: 16, color: '#555' }}>9:00 PM</Text>
          <Text style={{ fontSize: 14, color: '#888' }}>In 6 hours 22 mins</Text>
          <Switch value={true} />
        </View>

        {/* Alarm */}
        <View style={{ backgroundColor: '#f9f9f9', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Alarm</Text>
          <Text style={{ fontSize: 16, color: '#555' }}>5:00 AM</Text>
          <Text style={{ fontSize: 14, color: '#888' }}>In 11 hours 22 mins</Text>
          <Switch value={false} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SleepTrack;
