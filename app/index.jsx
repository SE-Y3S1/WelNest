import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Image, Dimensions } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../constants';
import CustomButton from '../components/CustomButton';

export default function App() {

  async function signin() {
    router.replace('sign-up');
  }
  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={icons.welnest}
            resizeMode="contain"
            className="w-60 h-28 mx-auto"
          />
          <Image
            source={icons.onboarding}
            resizeMode="contain"
            className="w-80 h-80 mx-auto"
          />
          <Text className="text-sm text-black font-pregular text-center mx-5 -my-3">
            Stay connected with your health journey through guided support and visual tracking.
          </Text>
          <CustomButton
            title="Get Started"
            handlePress={signin}
            containerStyles="mt-10"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );

}