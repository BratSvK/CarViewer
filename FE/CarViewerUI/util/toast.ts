import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "warning";

export const showToast = (type: ToastType, message: string) => {
  Toast.show({
    type,
    text1: message,
    position: "top",
    visibilityTime: 3000,
    topOffset: 50,
    autoHide: true,
  });
};
