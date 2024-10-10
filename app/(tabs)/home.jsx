import { View, Text } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
    <ScrollView
       contentContainerStyle={{
         height: "100%",
       }}
     >
     <View className="flex-1 items-center justify-center bg-primary">
           <Text className="text-3xl text-black font-bold text-center">
             Wellness{"\n"}
             Pioneers{" "}
           </Text>
           <Link href="/home" style={{color:'blue'}}>Home</Link> 
           <Link href="/sign-in" style={{color:'blue'}}>Signin</Link> 
         </View>  
     </ScrollView>
   </SafeAreaView>
  )
}

export default Home;
