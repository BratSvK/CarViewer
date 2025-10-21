import { useCallback } from "react";
import { Alert } from "react-native";

export const useToast = () => {
  const showToast = useCallback((message: string, title?: string) => {
    Alert.alert(title || "Info", message);
  }, []);

  return { showToast };
};
