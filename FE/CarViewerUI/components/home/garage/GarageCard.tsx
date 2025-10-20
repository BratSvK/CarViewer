import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
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
  name: { fontSize: 16, fontWeight: "600" },
  details: { color: "#666", fontSize: 14 },
  shared: { color: "#007bff", fontSize: 13, fontWeight: "500", marginTop: 4 },
});
