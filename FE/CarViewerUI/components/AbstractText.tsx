import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextStyle } from 'react-native';


type AbstractTextProps = {
  textKey: string;
  className?: string;
  style?: TextStyle | TextStyle[];
};

const AbstractText: React.FC<AbstractTextProps> = ({ textKey: word, style }) => {
  const { t } = useTranslation();

  return (
    <Text style={style}>{t(word)}</Text>
  );
};

export default AbstractText;