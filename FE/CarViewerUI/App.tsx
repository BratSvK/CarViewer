import "./services/i18n";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Toast, { BaseToastProps } from "react-native-toast-message";
import { Provider } from "react-redux";
import { NotificationToast } from "./components/NotificationToast";
import AuthNavigator from "./navigation/AuthNavigator";
import { store } from './store';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </Provider>
      <Toast
        position="top"
        topOffset={40}
        config={{
          success: (props: BaseToastProps) => (
            <NotificationToast {...props} type="success" />
          ),
          error: (props: BaseToastProps) => (
            <NotificationToast {...props} type="error" />
          ),
          warning: (props: BaseToastProps) => (
            <NotificationToast {...props} type="warning" />
          ),
        }}
      />
    </>
  );
}
