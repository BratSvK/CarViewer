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
    backgroundColor: GlobalStyles.colors.primary800,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.primary400,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: GlobalStyles.colors.primary50,
  },
});

export default HomeHeader;