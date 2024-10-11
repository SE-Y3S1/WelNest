import { View, Text, ScrollView, Alert, Image, Dimensions } from 'react-native'
import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from "expo-router";
import app from '../../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { icons } from '../../constants';
const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  async function login() {
    setSubmitting(true);
    try {
      const auth = getAuth(app);
      const response = await signInWithEmailAndPassword(auth, form.email, form.password);
      setSubmitting(false);
      // navigation.dispatch(StackActions.replace('home')); // use this when following the crud video
      router.replace('home');
      return;
    } catch (error) {
      setSubmitting(false);
      Alert.alert('Ooops', error.message);
    
  }
  

  };

  return (
    <SafeAreaView className="h=full">
    <ScrollView>
    <View
          className="w-full flex justify-center h-full px-7 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
      <Image
            source={icons.welnest}
            resizeMode="contain"
             className="w-60 h-28 mx-auto"
          />
        <Text className="text-2xl text-black font-psemibold mt-10">
          Log in to WelNest
        </Text>
        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-7"
          keyboardType="email-address"
        />
        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Sign In"
          handlePress={login}
          containerStyles="mt-7"
          isLoading={isSubmitting}
        />

        <View className="flex justify-center pt-5 flex-row gap-2">
          <Text className="text-sm text-black font-pregular">
            Don't have an account?
          </Text>
          <Link
            href="/sign-up"
            className="text-sm font-psemibold text-secondary"
          >
            Sign Up
          </Link>
          </View>

      </View>
    </ScrollView>
  </SafeAreaView>
  )
} 
export default SignIn