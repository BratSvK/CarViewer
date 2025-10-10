import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import AbstractText from "../components/AbstractText";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import ValidatedInput from "../components/ValidationInput";
import LOCALIZATION from "../constants/localization";
import { AuthStackParamList } from "../navigation/AuthNavigator";
import authService from "../services/authService";
import { login } from "../store/auth";
import { useAppDispatch } from "../store/hooks";
import { showToast } from "../util/toast";

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(LOCALIZATION.validation.invalidEmail)
      .required(LOCALIZATION.validation.emailRequired),
    password: Yup.string()
      .min(6, LOCALIZATION.validation.passwordMin)
      .required(LOCALIZATION.validation.passwordRequired),
  });

  const handleForgotPassword = (email: string) => {
    console.log("Forgot password for:", email);
    authService.forgotPassword(email);
    setModalVisible(false); // Close the modal after handling
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: { email: string; password: string }) => {
    const user = await authService.login(data.email, data.password);
    dispatch(login(user));

    showToast("success", "Login successful!");
  };

  var imageLogo = require("../assets/logo_welcome.png");

  return (
    <View style={styles.container}>
      <Image source={imageLogo} style={styles.logo} />
      <ValidatedInput
        control={control}
        name="email"
        placeholderKey={LOCALIZATION.forms.email}
        errors={errors}
        keyboardType="email-address"
        style={styles.input}
      />
      <ValidatedInput 
        control={control}
        name="password"
        placeholderKey={LOCALIZATION.forms.password}
        errors={errors}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <AbstractText
          textKey={LOCALIZATION.loginScreen.forgotPassword}
          style={styles.forgot}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleLogin)}
      >
        <AbstractText
          textKey={LOCALIZATION.loginScreen.loginButton}
          style={styles.buttonText}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <AbstractText
          textKey={LOCALIZATION.loginScreen.signUpPrompt}
          style={styles.switch}
        />
      </TouchableOpacity>
      <ForgotPasswordModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleForgotPassword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161629",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 36,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: "100%",
    backgroundColor: "#23234b",
    color: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  forgot: {
    alignSelf: "flex-end",
    color: "#AAAFFF",
    marginBottom: 28,
  },
  button: {
    backgroundColor: "#3a36db",
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 8,
    marginBottom: 18,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },
  switch: {
    color: "#aaa",
    marginTop: 10,
  },
  logo: {
    width: 400,
    height: 300,
    marginBottom: 5,
  },
});

export default LoginScreen;
