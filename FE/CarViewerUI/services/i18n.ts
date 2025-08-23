import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { SUPPORTED_LNG_NAMES } from "../constants/localization";
import en from "../locales/en.json";
import sk from "../locales/sk.json";

const resources = {
  sk: { translation: sk },
  en: { translation: en }
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v4",
    resources,
    lng: SUPPORTED_LNG_NAMES.default,
    fallbackLng: SUPPORTED_LNG_NAMES.default,
    interpolation: { escapeValue: false },
  });

export default i18n;