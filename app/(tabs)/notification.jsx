import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have this package installed

const notifications = [
 
  // Additional Notifications
  {
    id: 6,
    title: "Meal Plan Reminder",
    message: "It's time to follow your meal plan for today. Stay healthy!",
    icon: "restaurant-outline",
    color: "#F59D00"
  },
  {
    id: 7,
    title: "Sleep Plan Reminder",
    message: "It's almost bedtime. Stick to your personalized sleep plan to wake up refreshed!",
    icon: "moon-outline",
    color: "#3B82F6"
  },
  {
    id: 8,
    title: "Health Log Reminder",
    message: "Don't forget to log today's symptoms and health conditions.",
    icon: "clipboard-outline",
    color: "#22C55E"
  },
  {
    id: 9,
    title: "New Nutrient Tips",
    message: "Check out the latest nutrient tips and suggestions for a balanced diet.",
    icon: "nutrition-outline",
    color: "#FFA001"
  },
  {
    id: 10,
    title: "Goal Achievement",
    message: "Great job! You've hit your fitness goal for the day. Keep it up!",
    icon: "checkmark-circle-outline",
    color: "#F59D00"
  },
  {
    id: 11,
    title: "Hydration Reminder",
    message: "Don't forget to drink water! Staying hydrated is key to good health.",
    icon: "water-outline",
    color: "#3B82F6"
  },
  {
    id: 12,
    title: "Sleep Quality Report",
    message: "Your sleep pattern was below average last night. Review your sleep tips to improve tonight.",
    icon: "bed-outline",
    color: "#6D28D9"
  },
  {
    id: 13,
    title: "Workout Session Complete",
    message: "Well done! You’ve completed your workout session for the day.",
    icon: "fitness-outline",
    color: "#F59D00"
  },
  {
    id: 14,
    title: "New Recipe Suggestion",
    message: "Try this delicious and healthy new recipe tailored to your nutrient needs.",
    icon: "pizza-outline",
    color: "#EF4444"
  },
  {
    id: 15,
    title: "Health Check Reminder",
    message: "It’s time for your monthly health check. Schedule an appointment today!",
    icon: "medical-outline",
    color: "#22C55E"
  },
  {
    id: 16,
    title: "Motivational Quote",
    message: "“The only bad workout is the one that didn’t happen.” Keep pushing!",
    icon: "chatbubble-outline",
    color: "#F59D00"
  },
  {
    id: 17,
    title: "Mental Health Check-in",
    message: "Take a moment to relax and de-stress. Your mental health is just as important!",
    icon: "heart-outline",
    color: "#FF3E00"
  },
];

const NotificationScreen = () => {
  return (
    <View>
      <Text>Notificatiobcbn</Text>
    </View>
  )
}

export default NotificationScreen;
