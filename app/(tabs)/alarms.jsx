import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAlarms, deleteAlarm } from '../firebase/alarmService'; 
import { useNavigation } from '@react-navigation/native';  // To navigate to other screens

const Alarms = () => {
  const [alarms, setAlarms] = useState([]);
  const navigation = useNavigation();  // To navigate to update page

  useEffect(() => {
    async function fetchAlarms() {
      try {
        const fetchedAlarms = await getAlarms();  // Fetch alarms from Firebase
        setAlarms(fetchedAlarms);
      } catch (error) {
        console.error("Error fetching alarms: ", error);
        Alert.alert("Error", "Failed to load alarms.");
      }
    }

    fetchAlarms();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteAlarm(id);  // Delete the alarm from Firebase
      Alert.alert("Success", "Alarm deleted successfully!");
      setAlarms(alarms.filter(item => item.id !== id));  // Remove the deleted item from the state
    } catch (error) {
      console.error("Error deleting alarm: ", error);
      Alert.alert("Error", "Failed to delete alarm.");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', paddingHorizontal: 16, marginVertical: 24 }}>
          <Text style={{ fontSize: 24, color: 'black', fontWeight: '600', marginBottom: 20 }}>Alarms</Text>

          {alarms.map((alarm) => (
            <View key={alarm.id} style={{
              backgroundColor: '#F5F5F5',
              padding: 15,
              borderRadius: 10,
              marginBottom: 15,
              elevation: 5,
            }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{alarm.name}</Text>
              <Text>Date: {new Date(alarm.date.seconds * 1000).toLocaleDateString()}</Text>
              <Text>Time: {new Date(alarm.time.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>

              {/* Alarm Enabled Switch */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Switch value={alarm.enabled} disabled={true} />
                <Text style={{ marginLeft: 10 }}>Alarm Enabled</Text>
              </View>

              {/* Vibration Toggle */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Switch value={alarm.vibrate} disabled={true} />
                <Text style={{ marginLeft: 10 }}>Vibrate</Text>
              </View>

              {/* Repeat Frequency */}
              <Text style={{ marginTop: 10 }}>Repeat: {alarm.repeat}</Text>

              {/* Buttons */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                {/* Update Button */}
                <TouchableOpacity
                  style={{ padding: 10, backgroundColor: '#FFA500', borderRadius: 5 }}
                  onPress={() => navigation.navigate('UpdateAlarm', { alarm })}
                >
                  <Text style={{ color: '#fff' }}>Update</Text>
                </TouchableOpacity>

                {/* Delete Button */}
                <TouchableOpacity
                  style={{ padding: 10, backgroundColor: '#FF6347', borderRadius: 5 }}
                  onPress={() => handleDelete(alarm.id)}
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

export default Alarms;
