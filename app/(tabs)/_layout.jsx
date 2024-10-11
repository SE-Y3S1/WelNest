import { Stack } from 'expo-router';
import { View, Image } from 'react-native';
import { Tabs } from 'expo-router';
import { icons } from '../../constants';

const TabIcon = ({ icon, color }) => {
    return (
        <View className="items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-8 h-8"
            />
        </View>
    );
};

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#FFA001",
                tabBarInactiveTintColor: "#A8A8A8",
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",
                    borderTopColor: "transparent",
                    height: 84,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.2,
                    shadowRadius: 15,
                    elevation: 5,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabIcon icon={icons.home} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="calendar"
                options={{
                    title: 'Calendar',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabIcon icon={icons.calendar} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="notification"
                options={{
                    title: 'Notification',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabIcon icon={icons.bell} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabIcon icon={icons.profile} color={color} />
                    ),
                }}
            />
               <Tabs.Screen
                    name="symptomForm"
                    options={{
                        title: 'Symptoms',
                        headerShown: false,
                        tabBarButton: () => null,
                    }}
                />
                <Tabs.Screen
                    name="symptomsList"
                    options={{
                        title: 'Symptoms',
                        headerShown: false,
                        tabBarButton: () => null,
                    }}
                />

                <Tabs.Screen
                    name="updateSymptom"
                    options={{
                        title: 'Symptoms',
                        headerShown: false,
                        tabBarButton: () => null,
                    }}
                />
                 <Tabs.Screen
                    name="sleepTrack"
                    options={{
                        title: 'sleepTrack',
                        headerShown: false,
                        tabBarButton: () => null,
                    }}
                />


            

            {/* Hidden Tabs */}
            {['meal_planner', 'recipe', 'nutrition', 'nutrition_add','added','edititem'].map(screen => (
                <Tabs.Screen
                    key={screen}
                    name={screen}
                    options={{
                        title: screen,
                        headerShown: false,
                        tabBarButton: () => null, // Hiding from tab bar
                    }}
                />
            ))}
        </Tabs>
    );
};

export default TabsLayout;
