import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AbstractInputText from '../components/AbstractInputText';
import AbstractText from '../components/AbstractText';
import localization from '../constants/localization';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { login } from '../store/auth';
import { useAppDispatch } from '../store/hooks';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const dispatch = useAppDispatch();

  function handleLogin() {
    // Tu môže byť volanie na backend/Firebase
    dispatch(login({ name: 'Mock User', email }));
    console.log('User logged in:', { name: 'Mock User', email });
  }

  return (
    <View style={styles.container}>
      <AbstractText
        textKey={localization.loginScreen.welcome}
        style={styles.title}
      />
      <AbstractInputText
        placeholderKey={localization.forms.email}
        style={styles.input}
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
      <TouchableOpacity>
        <AbstractText
          textKey={localization.loginScreen.forgotPassword}
          style={styles.forgot}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <AbstractText
          textKey={localization.loginScreen.loginButton}
          style={styles.buttonText}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <AbstractText
          textKey={localization.loginScreen.signUpPrompt}
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

export default LoginScreen;
