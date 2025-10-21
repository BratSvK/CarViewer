import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const HomeStatusBar = () => {
  return (
    <View style={styles.container}>
        <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: GlobalStyles.colors.primaryMuted800,
    paddingLeft: 10,
    alignItems: "flex-start",
  }
});

export default HomeStatusBar;
