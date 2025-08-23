import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import CountryFlag from "react-native-country-flag";
import * as flags from 'react-native-country-flag-data';
import { SUPPORTED_LNG_NAMES } from "../constants/localization";

export default function LanguageFlag() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const countryCode =
    currentLang === SUPPORTED_LNG_NAMES.default
      ? SUPPORTED_LNG_NAMES.default
      : SUPPORTED_LNG_NAMES.en; 

  return (
    <TouchableOpacity
      onPress={() =>
        i18n.changeLanguage(
          currentLang === SUPPORTED_LNG_NAMES.en
            ? SUPPORTED_LNG_NAMES.default
            : SUPPORTED_LNG_NAMES.en
        )
      }
      style={{ marginRight: 5 }}
    >
      <CountryFlag
        isoCode={countryCode}
        size={30}
        flags={flags}
        style={{ borderColor: "white", borderWidth: 1 }}
      />
    </TouchableOpacity>
  );
}