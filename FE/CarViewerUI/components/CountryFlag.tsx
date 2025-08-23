import React from "react";
import { Image } from "react-native";

interface CountryFlagProps {
  isoCode: string;
  size: number;
  flags: any;
  style?: any;
}

const CountryFlag = ({ isoCode, size, flags, style }: CountryFlagProps) => {
  const getFlagSource = () => {
    if (flags) {
        return flags?.[isoCode.toLowerCase()];
      }
    }

  return (
    <Image
      source={getFlagSource()}
      style={[{ width: size * 1.6, height: size }, style]}
      resizeMode="contain"
    />
  );
};

export default CountryFlag;