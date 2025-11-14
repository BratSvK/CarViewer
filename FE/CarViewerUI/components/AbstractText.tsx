import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextStyle } from 'react-native';


type AbstractTextProps = {
  textKey: string;
  className?: string;
  style?: TextStyle | TextStyle[];
  options?: Record<string, any>
};

const AbstractText: React.FC<AbstractTextProps> = ({ textKey: word, style, options }) => {
  const { t } = useTranslation();

  return (
    <Text style={style}>{t(word, options)}</Text>
  );
};

export default AbstractText;