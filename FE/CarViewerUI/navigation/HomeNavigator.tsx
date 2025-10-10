import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeHeader from "../components/HomeHeader";
import CarScreen from "../screens/CarScreen";
import HomeScreen from "../screens/HomeScreen";

export type HomeTabParamList = {
  Home: undefined;
  Car: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

export default function HomeNavigator() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          header: () => <HomeHeader />,
          tabBarIcon: ({ color, size }) => {
            const iconName =
              route.name === "Home"
                ? "house"
                : route.name === "Car"
                ? "car"
                : "question";
            
            return <FontAwesome6 name={iconName} iconStyle="solid" size={size} color={color}  />;
          },
          tabBarActiveTintColor: "#3a36db",
          tabBarInactiveTintColor: "gray",
          tabBarShowLabel: false,
          animation: 'none'
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Car" component={CarScreen} />
      </Tab.Navigator>
    </>
  );
}
