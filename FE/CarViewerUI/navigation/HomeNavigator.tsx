import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeHeader from "../components/home/HomeStatusBar";
import { SCREENS } from "../constants/screens";
import { GlobalStyles } from "../constants/styles";
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

            return (
              <FontAwesome6
                name={iconName}
                iconStyle="solid"
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: GlobalStyles.colors.primary500,
          tabBarInactiveTintColor: GlobalStyles.colors.primary100,
          tabBarShowLabel: false,
          tabBarIconStyle: {
            marginTop: 8,
          },
          tabBarStyle: {
            backgroundColor: GlobalStyles.colors.primary800,
            borderTopColor: GlobalStyles.colors.primary400,
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
