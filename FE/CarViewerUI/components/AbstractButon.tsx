import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

interface AbstractButtonProps {
  textKey: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AbstractButton: React.FC<AbstractButtonProps> = ({
  textKey,
  onPress,
  style,
  textStyle,
}) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{t(textKey)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3a36db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AbstractButton;