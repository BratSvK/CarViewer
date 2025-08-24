import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import AbstractInputText from './AbstractInputText';
import AbstractText from './AbstractText';

interface ValidatedInputProps {
  control: any;
  name: string;
  placeholderKey: string;
  style?: any;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  errors: any;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  control,
  name,
  placeholderKey,
  style,
  secureTextEntry = false,
  keyboardType = 'default',
  errors,
}) => {
  return (
    <View style={{ width: "100%" }}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <AbstractInputText
            placeholderKey={placeholderKey}
            style={[styles.input, style]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize="none"
          />
        )}
      />
      {errors[name] && (
        <AbstractText
          textKey={errors[name]?.message}
          style={styles.errorText}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: '#23234b',
    color: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});

export default ValidatedInput;