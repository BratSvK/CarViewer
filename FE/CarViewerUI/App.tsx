import "./services/i18n";

import Toast, { BaseToastProps } from "react-native-toast-message";
import { Provider } from "react-redux";
import { NotificationToast } from "./components/NotificationToast";
import AppNavigator from "./navigation/AppNavigator";
import { store } from './store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
      <Toast
        position="top"
        topOffset={40}
        config={{
          success: (props: BaseToastProps) => (
            <NotificationToast {...props} type="success" />
          ),
          info: (props: BaseToastProps) => (
            <NotificationToast {...props} type="info" />
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
