import React from "react";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import AbstractText from "../AbstractText";
import LogoutButton from "../LogoutButton";

type HeaderProps = {
  title: string;
};

const HomeHeader = ({ title }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <AbstractText textKey={title} style={styles.headerTitle} />
      <LogoutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: GlobalStyles.colors.barBackground,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.barStroke,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: GlobalStyles.colors.textPrimary,
  },
});

export default HomeHeader;