
import { View, Text, ScrollView, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from "expo-router";
import app from '../../firebaseConfig'
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  async function registerUser() {
    setSubmitting(true);

    try {
      const auth = getAuth(app);
      const response = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await updateProfile(response.user, { displayName: form.username });

      
      setSubmitting(false);

      Alert.alert(
        'Success',
        'Account created successfully',
        [
          {
            text: 'Okay',
            onPress: () => router.replace('home'),
          },
        ]
      );
    } catch (error) {
      setSubmitting(false);
      Alert.alert('Something went wrong', error.message);
    }
  }
  return (
    <SafeAreaView className="h=full">
      <ScrollView>
        <View className="w-full min-h-[95vh] justify-center px-4 my-6">
          <Text className="text-2xl text-black font-psemibold mt-10">
            Sign Up to Wellnest
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
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
            title="Sign Up"
            handlePress={registerUser}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-sm text-black font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-sm font-psemibold text-secondary"
            >
              Sign In
            </Link>
            </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
