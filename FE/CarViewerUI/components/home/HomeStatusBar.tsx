import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const HomeStatusBar = () => {
  return <View style={styles.container}>
    <StatusBar barStyle="light-content"  />
  </View>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: GlobalStyles.colors.barBackground,
    display: "flex",
    alignItems: "flex-start",
    paddingTop: 50,
    paddingBottom: 5,
  },
});

export default HomeStatusBar;
