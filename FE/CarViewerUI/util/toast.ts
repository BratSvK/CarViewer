import i18next from "i18next";
import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "warning";

export const showToast = (
  type: ToastType,
  translationKey: string,
  options?: Record<string, any>
) => {
  const message = i18next.t(translationKey, options);

  Toast.show({
    type,
    text1: message,
    position: "top",
    visibilityTime: 3000,
    topOffset: 50,
    autoHide: true,
  });
};
