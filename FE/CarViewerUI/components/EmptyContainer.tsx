import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "../constants/styles";

type EmptyStateProps = {
  iconName: string;
  title: string;
  description: string;
  buttonLabel: string;
  onButtonPress: () => void;
  iconColor?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export const EmptyContainer = ({
  iconName,
  title,
  description,
  buttonLabel,
  onButtonPress,
  iconColor = GlobalStyles.colors.primary500,
  containerStyle,
  textStyle,
}: EmptyStateProps) => {
  return (
    <View style={[styles.emptyContainer, containerStyle]}>
      <View style={styles.iconCircle}>
        <FontAwesome6
          name={iconName}
          iconStyle="solid"
          size={40}
          color={iconColor}
        />
      </View>

      <Text style={[styles.title, textStyle]}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <FontAwesome6
          name="plus"
          iconStyle="solid"
          size={20}
          color="white"
        />
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
    paddingHorizontal: 30,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(191, 123, 230, 0.16)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
    color: GlobalStyles.colors.primary50,
  },
  description: {
    textAlign: "center",
    color: GlobalStyles.colors.primary100,
    fontSize: 15,
    marginBottom: 24,
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary500,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
  },
});
