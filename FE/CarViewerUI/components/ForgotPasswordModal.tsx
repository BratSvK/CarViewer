import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Modal, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import LOCALIZATION from "../constants/localization";
import AbstractButton from "./AbstractButon";
import AbstractText from "./AbstractText";
import ValidatedInput from "./ValidationInput";

interface ForgotPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(LOCALIZATION.validation.invalidEmail)
      .required(LOCALIZATION.validation.emailRequired)
  });
  
  const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        email: "",
      },
    });

    const handleFormSubmit = (data: { email: string }) => {
      onSubmit(data.email);
      resetModal();
    };

    const resetModal = () => {
      reset();
      onClose();
    };

    const closeModal = () => {
      resetModal();
      onClose();
    };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <AbstractText
            textKey={LOCALIZATION.loginScreen.forgotPasswordPrompt}
            style={styles.modalTitle}
          />
          <ValidatedInput
            control={control}
            name="email"
            placeholderKey={LOCALIZATION.forms.email}
            errors={errors}
            keyboardType="email-address"
            style={styles.input}
          />
          <View style={styles.modalButtons}>
            <AbstractButton
              textKey={LOCALIZATION.forms.cancel}
              onPress={closeModal}
              style={styles.cancelButton}
            />
            <AbstractButton
              textKey={LOCALIZATION.forms.submit}
              onPress={handleSubmit(handleFormSubmit)}
              style={styles.submitButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    flex: 1,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#3a36db",
    flex: 1,
  },
});

export default ForgotPasswordModal;