import React from "react";
import { useTranslation } from "react-i18next";
import { Image, TouchableOpacity } from "react-native";

export default function LanguageFlag() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const flagSource =
    currentLang === "sk"
      ? require("../assets/flags/sk.png")
      : require("../assets/flags/en.png");

  return (
    <TouchableOpacity
      onPress={() =>
        i18n.changeLanguage(currentLang === "en" ? "sk" : "en")
      }
    >
      <Image
        source={flagSource}
        style={{ width: 30, height: 20, marginRight: 15 }}
      />
    </TouchableOpacity>
  );
}