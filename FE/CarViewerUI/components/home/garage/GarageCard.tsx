import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import { Garage } from "../../../types/home/garage/garage";

const GarageCard = ({
  garage,
  onPress,
}: {
  garage: Garage;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageWrapper}>
        {garage.imageUrl ? (
          <Image source={{ uri: garage.imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>{garage.name[0]}</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{garage.name}</Text>
        <Text style={styles.details}>{garage.carCount} cars</Text>
        {garage.isShared && <Text style={styles.shared}>Shared</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default GarageCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: GlobalStyles.colors.cardBackground,
    borderColor: GlobalStyles.colors.cardStroke,
    borderWidth: 1,
    borderRadius: GlobalStyles.radius,
    padding: 12,
    alignItems: "center",
  },
  imageWrapper: {
    width: 64,
    height: 64,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 12,
  },
  image: { width: "100%", height: "100%" },
  placeholder: {
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  placeholderText: { fontSize: 24, fontWeight: "bold", color: "#555" },
  info: { flex: 1 },
  name: {
    fontSize: 17,
    color: GlobalStyles.colors.textPrimary,
    fontWeight: "800",
  },
  details: { color: GlobalStyles.colors.textSecondary, fontSize: 14 },
  shared: { color: "#007bff", fontSize: 13, fontWeight: "500", marginTop: 4 },
});
