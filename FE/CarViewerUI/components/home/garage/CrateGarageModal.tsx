import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import LOCALIZATION from "../../../constants/localization";
import { GlobalStyles } from "../../../constants/styles";
import { Garage } from "../../../types/home/garage/garage";
import AbstractText from "../../AbstractText";

interface CreateGarageDialogProps {
  visible: boolean;
  onClose: () => void;
  onGarageCreated: (garage: Garage) => void;
}

const CreateGarageDialog: React.FC<CreateGarageDialogProps> = ({
  visible,
  onClose,
  onGarageCreated,
}) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    const newGarage: Garage = {
      id: Date.now().toString(),
      name: name.trim(),
      carCount: 0,
      imageUrl: "",
      ownerId: "user1", // Placeholder
      isShared: false,
    };
    onGarageCreated(newGarage);
    setName("");
    onClose();
  };

  const handleClose = () => {
    setName("");
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable style={styles.backdrop} onPress={handleClose} />
        <View style={styles.modalView}>
         
          <Pressable onPress={handleClose} style={styles.closeButton}>
            <FontAwesome6
              name="xmark"
              size={22}
              color={GlobalStyles.colors.textSecondary}
            />
          </Pressable>

          <View style={styles.header}>
            <AbstractText
              textKey={LOCALIZATION.createGarageModal.title}
              style={styles.title}
            />
          </View>
          <AbstractText
            textKey={LOCALIZATION.createGarageModal.subtitle}
            style={styles.subtitle}
          />

          <View style={styles.inputContainer}>
            <AbstractText
              textKey={LOCALIZATION.createGarageModal.inputLabel}
              style={styles.inputLabel}
            />
            <TextInput
              style={styles.input}
              placeholder={t(LOCALIZATION.createGarageModal.placeholder)}
              placeholderTextColor={GlobalStyles.colors.textSecondary}
              value={name}
              onChangeText={setName}
              autoFocus
            />
          </View>

          <View style={styles.actions}>
            <Pressable
              onPress={handleClose}
              style={({ pressed }) => [
                styles.button,
                styles.cancelButton,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Text style={styles.buttonText}>
                {t(LOCALIZATION.createGarageModal.cancelButton)}
              </Text>
            </Pressable>
            <Pressable
              onPress={handleCreate}
              style={({ pressed }) => [
                styles.button,
                styles.createButton,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Text style={[styles.buttonText, styles.createText]}>
                {t(LOCALIZATION.createGarageModal.createButton)}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CreateGarageDialog;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: GlobalStyles.colors.cardBackground,
    borderRadius: 16,
    padding: 24,
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: GlobalStyles.colors.textPrimary,
  },
  closeButton: {
    position: "absolute",
    top: 24,
    right: 24,
    zIndex: 1,
    padding: 4,
  },
  subtitle: {
    fontSize: 16,
    color: GlobalStyles.colors.textSecondary,
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 8,
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: GlobalStyles.colors.barBackground,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.cardStroke,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: GlobalStyles.colors.textPrimary,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: GlobalStyles.colors.textSecondary,
  },
  cancelButton: {
    backgroundColor: GlobalStyles.colors.cardStroke,
  },
  createButton: {
    backgroundColor: GlobalStyles.colors.iconActive,
  },
  createText: {
    color: "white",
  },
});
