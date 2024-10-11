import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';

const Home = () => {
  const navigation = useNavigation();

  
  const icons = {
    mealPlanning: require('../../assets/images/meal.png'), 
    symptomLogging: require('../../assets/images/image.png'),
    sleepTracking: require('../../assets/images/sleep.png'),
    healthGoalSetting: require('../../assets/images/goalsetting.png'),
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
        <View className="px-6 py-1">
          {/* Greeting */}
          <Text className="text-3xl font-bold text-black mb-2 text-center">Wellness Pioneers</Text>

          {/* Tile Buttons */}
          <View className="space-y-4">
            {/* Meal Planning */}
            <TouchableOpacity
    className="bg-gray-200 rounded-lg p-4 flex-row items-center"
    style={{
      shadowColor: '#000',    // Shadow color
      shadowOffset: { width: 0, height: 4 },  // Shadow offset
      shadowOpacity: 0.3,     // Shadow opacity
      shadowRadius: 4,        // Shadow radius
      elevation: 8,           // Shadow for Android
    }}
    onPress={() => navigation.navigate('mealPlanning')}
  >
    <Image 
      source={icons.mealPlanning} 
      style={{ 
        width: 70,            
        height: 70,           
        marginRight: 20 
      }} 
    />
    <Text className="text-xl font-bold text-black">   {/* Larger font size */}
      Meal Planning
    </Text>
  </TouchableOpacity>

            {/* Symptom Logging */}
  <TouchableOpacity
    className="bg-gray-200 rounded-lg p-4 flex-row items-center"
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 8,
    }}
    onPress={() => navigation.navigate('symptomsList')}
  >
    <Image 
      source={icons.symptomLogging} 
      style={{ 
        width: 70,       
        height: 70,      
        marginRight: 20 
      }} 
    />
    <Text className="text-xl font-bold text-black">  {/* Larger font size */}
      Symptom Logging
    </Text>
  </TouchableOpacity>

  {/* Sleep Tracking */}
  <TouchableOpacity
    className="bg-gray-200 rounded-lg p-4 flex-row items-center"
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 8,
    }}
    onPress={() => navigation.navigate('sleepTrack')}
  >
    <Image 
      source={icons.sleepTracking} 
      style={{ 
        width: 70,        
        height: 70,       
        marginRight: 20 
      }} 
    />
    <Text className="text-xl font-bold text-black">   {/* Larger font size */}
      Sleep Tracking
    </Text>
  </TouchableOpacity>

  {/* Health Goal Setting */}
  <TouchableOpacity
    className="bg-gray-200 rounded-lg p-4 flex-row items-center"
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 8,
    }}
    onPress={() => navigation.navigate('healthGoalSetting')}
  >
    <Image 
      source={icons.healthGoalSetting} 
      style={{ 
        width: 70,        
        height: 70,       
        marginRight: 20 
      }} 
    />
    <Text className="text-xl font-bold text-black">  {/* Larger font size */}
      Health Goal Setting
    </Text>
  </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Home;
