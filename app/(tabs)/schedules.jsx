import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getBedtimes, deleteBedtime } from '../firebase/sTrackService';  
import { useNavigation } from '@react-navigation/native';  // To navigate to other screens

const Schedules = () => {
  const [bedtimes, setBedtimes] = useState([]);
  const navigation = useNavigation();  // To navigate to update page

  useEffect(() => {
    async function fetchBedtimes() {
      try {
        const fetchedBedtimes = await getBedtimes();  // Fetch bedtimes from Firebase
        setBedtimes(fetchedBedtimes);
      } catch (error) {
        console.error("Error fetching bedtimes: ", error);
        Alert.alert("Error", "Failed to load bedtimes.");
      }
    }

    fetchBedtimes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBedtime(id);  // Delete the bedtime from Firebase
      Alert.alert("Success", "Bedtime deleted successfully!");
      setBedtimes(bedtimes.filter(item => item.id !== id));  // Remove the deleted item from the state
    } catch (error) {
      console.error("Error deleting bedtime: ", error);
      Alert.alert("Error", "Failed to delete bedtime.");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full h-full justify-center px-4 my-6">
          <Text className="text-2xl text-black font-semibold mb-5 ">Bed Times</Text>

          {bedtimes.map((bedtime) => (
            <View key={bedtime.id} style={{
              backgroundColor: '#F5F5F5',
              padding: 15,
              borderRadius: 10,
              marginBottom: 15,
              elevation: 5,
            }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>{bedtime.note}</Text>
              <Text>Date: {new Date(bedtime.date.seconds * 1000).toLocaleDateString()}</Text>
              <Text>Time: {new Date(bedtime.bedTime.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
              
              {/* Do Not Disturb */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Switch value={bedtime.doNotDisturb} disabled={false} />
                <Text style={{ marginLeft: 10 }}>Do not disturb</Text>
              </View>

              {/* Buttons */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                {/* Update Button */}
                <TouchableOpacity
                  style={{ padding: 10, backgroundColor: '#FFA500', borderRadius: 5 }}
                  onPress={() => navigation.navigate('UpdateBedtime', { bedtime })}
                >
                  <Text style={{ color: '#fff' }}>Update</Text>
                </TouchableOpacity>

                {/* Delete Button */}
                <TouchableOpacity
                  style={{ padding: 10, backgroundColor: '#FF6347', borderRadius: 5 }}
                  onPress={() => handleDelete(bedtime.id)}
                >
                  <Text style={{ color: '#fff' }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Schedules;
