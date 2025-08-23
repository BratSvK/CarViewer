import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AbstractInputText from '../components/AbstractInputText';
import AbstractText from '../components/AbstractText';
import localization from '../constants/localization';
import { AuthStackParamList } from '../navigation/AuthNavigator';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <View style={styles.container}>
      <AbstractText
        textKey={localization.registerScreen.createAccount}
        style={styles.title}
      />
      <AbstractInputText
        placeholderKey={localization.registerScreen.username}
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <AbstractInputText
        placeholderKey={localization.forms.email}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <AbstractInputText
        placeholderKey={localization.forms.password}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
        <AbstractText
          textKey={localization.registerScreen.registerButton}
          style={styles.buttonText}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <AbstractText
          textKey={localization.registerScreen.loginPrompt}
          style={styles.switch}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161629',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 36,
  },
  input: {
    width: '100%',
    backgroundColor: '#23234b',
    color: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  forgot: {
    alignSelf: 'flex-end',
    color: '#AAAFFF',
    marginBottom: 28,
  },
  button: {
    backgroundColor: '#3a36db',
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 8,
    marginBottom: 18,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  switch: {
    color: '#aaa',
    marginTop: 10,
  },
});

export default RegisterScreen;
