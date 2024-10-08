import { View, Text, Button } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router'; // Import the router hook

const Home = () => {
  const router = useRouter(); // Get the router object

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Sleep Tracker"
        onPress={() => router.push('/sleepTrack')}  // Use router.push to navigate
      />
    </View>
  );
};

export default Home;

