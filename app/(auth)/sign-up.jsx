
import { View, Text, ScrollView, Alert, Dimensions, Image } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants'
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
