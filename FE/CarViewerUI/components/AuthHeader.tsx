// components/CustomHeader.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import LanguageFlag from "./LanguageFlag";

const AuthHeader = () => {
  return (
    <View style={styles.container}>
      <LanguageFlag />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 45,
    paddingRight: 10,
    alignItems: "flex-end",
    backgroundColor: GlobalStyles.colors.primary800,
  },
});

export default AuthHeader;
