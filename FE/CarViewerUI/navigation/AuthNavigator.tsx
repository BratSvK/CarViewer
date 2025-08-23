import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomHeader from "../components/CustomHeader";
import { SCREENS } from "../constants/screens";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

// Defines types for navigation in the Auth stack of the application
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined; // if you have parameters use this: { expenseId: string }
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      header: () => <CustomHeader />,
      animation: "none"
    }}
  >
    <Stack.Screen name={SCREENS.LOGIN as never} component={LoginScreen} />
    <Stack.Screen
      name={SCREENS.REGISTER as never}
      component={RegisterScreen}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
