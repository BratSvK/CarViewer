import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeHeader from "../../components/home/HomeHeader";
import LOCALIZATION from "../../constants/localization";

const CarsScreen = () => {
  return (
    <View style={styles.container}>
      <HomeHeader title={LOCALIZATION.carsScreen.carsTitle} />
      <View style={styles.sectionHeader}>
        <Text style={styles.text}>Car Screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionHeader: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CarsScreen;