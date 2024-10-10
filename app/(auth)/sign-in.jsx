import { View, Text, ScrollView, Alert } from 'react-native'
import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from "expo-router";
import app from '../../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
      <View className="w-full min-h-[95vh] justify-center px-4 my-6">
        <Text className="text-2xl text-black font-psemibold mt-10">
          Log in to Wellnest
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