import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import LogoutButton from "./LogoutButton";

const HomeHeader = () => {
  return (
    <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <LogoutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 45,
    paddingRight: 10,
    alignItems: "flex-end",
  }
});

export default HomeHeader;
