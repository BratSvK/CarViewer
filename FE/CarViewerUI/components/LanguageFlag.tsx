import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import * as flags from "react-native-country-flag-data";
import { SUPPORTED_LNG_NAMES } from "../constants/localization";
import CountryFlag from "./CountryFlag";

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
      style={{ marginRight: 10, marginTop: 15 }}
    >
      <CountryFlag
        isoCode={countryCode}
        size={30}
        flags={flags}
      />
    </TouchableOpacity>
  );
}
