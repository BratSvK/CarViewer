import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeStatusBar from "../components/home/HomeStatusBar";
import { SCREENS } from "../constants/screens";
import { GlobalStyles } from "../constants/styles";
import CarScreen from "../screens/garage/CarScreen";
import HomeScreen from "../screens/garage/HomeScreen";

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
          header: () => <HomeStatusBar />,
          tabBarIcon: ({ color, size }) => {
            const iconName =
              route.name === "Home"
                ? "house"
                : route.name === "Car"
                ? "car"
                : "question";

            return (
              <FontAwesome6
                name={iconName}
                iconStyle="solid"
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: GlobalStyles.colors.iconActive,
          tabBarInactiveTintColor: GlobalStyles.colors.iconInactive,
          tabBarShowLabel: false,
          tabBarIconStyle: {
            marginTop: 8,
          },
          tabBarStyle: {
            backgroundColor: GlobalStyles.colors.cardBackground,
            borderTopWidth: 2,
            borderTopColor: GlobalStyles.colors.barStroke,
          },
          animation: "none",
        })}
      >
        <Tab.Screen name={SCREENS.HOME as never} component={HomeScreen} />
        <Tab.Screen name={SCREENS.CAR as never} component={CarScreen} />
      </Tab.Navigator>
    </>
  );
}
