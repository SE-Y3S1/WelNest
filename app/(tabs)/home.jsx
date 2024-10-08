import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link href="/meal_planner" style={{color:'blue'}}>Meal Planner</Link> 
      <Link href="/recipe" style={{color:'blue'}}>RecipeScreen</Link> 
    </View>
      
  )
}

export default Home