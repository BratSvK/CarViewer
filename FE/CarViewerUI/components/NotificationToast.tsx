import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  text1?: string;
  text2?: string;
  type: "success" | "info" | "error" | "warning";
};

export const NotificationToast = ({ text1, text2, type }: Props) => {
  let bgColor = "#fff";
  let icon = "information-circle";
  let iconColor = "#000";

  switch (type) {
    case "success":
      bgColor = "#d4edda";
      icon = "checkmark-circle";
      iconColor = "#28a745";
      break;
    case "info":
      bgColor = "#d1ecf1";
      icon = "information-circle";
      iconColor = "#17a2b8";
      break;
    case "error":
      bgColor = "#f8d7da";
      icon = "close-circle";
      iconColor = "#dc3545";
      break;
    case "warning":
      bgColor = "#fff3cd";
      icon = "warning";
      iconColor = "#ffc107";
      break;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: bgColor,
        padding: 12,
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
      }}
    >
      <Ionicons name={icon as any} size={24} color={iconColor} style={{ marginRight: 8 }} />
      <View>
        <Text style={{ fontWeight: "bold", color: "#000" }}>{text1}</Text>
        {text2 ? <Text style={{ color: "#333" }}>{text2}</Text> : null}
      </View>
    </View>
  );
};
