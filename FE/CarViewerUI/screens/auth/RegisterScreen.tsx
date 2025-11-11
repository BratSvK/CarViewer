import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import AbstractText from "../../components/AbstractText";
import ValidatedInput from "../../components/ValidationInput";
import LOCALIZATION from "../../constants/localization";
import { SCREENS } from "../../constants/screens";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import authService from "../../services/authService";
import { register } from "../../store/auth";
import { useAppDispatch } from "../../store/hooks";
import { RegisterUserCommand } from "../../types/auth/registerUserRequest";
import { showToast } from "../../util/toast";

const RegisterScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useAppDispatch();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(LOCALIZATION.validation.invalidEmail)
      .required(LOCALIZATION.validation.emailRequired),
    password: Yup.string()
      .min(6, LOCALIZATION.validation.passwordMin)
      .required(LOCALIZATION.validation.passwordRequired),
  });

  // React Hook Form setup
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

  const handleRegister = async (data: { email: string; password: string }) => {
    const request: RegisterUserCommand = {
      email: data.email,
      password: data.password,
    };

    const user = await authService.register(request);
    dispatch(register(user));

    showToast("success", LOCALIZATION.registerScreen.registerSuccess);
    navigation.navigate(SCREENS.LOGIN as never);
  };

  return (
    <View style={styles.container}>
      <AbstractText
        textKey={LOCALIZATION.registerScreen.createAccount}
        style={styles.title}
      />
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
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleRegister)}
      >
        <AbstractText
          textKey={LOCALIZATION.registerScreen.registerButton}
          style={styles.buttonText}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <AbstractText
          textKey={LOCALIZATION.registerScreen.loginPrompt}
          style={styles.switch}
        />
      </TouchableOpacity>
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
});

export default RegisterScreen;
