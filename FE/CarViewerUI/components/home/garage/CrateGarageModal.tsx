import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Garage } from "../../../types/home/garage/garage";

const CreateGarageDialog = ({
  visible,
  onClose,
  onGarageCreated,
}: {
  visible: boolean;
  onClose: () => void;
  onGarageCreated: (garage: Garage) => void;
}) => {
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    const newGarage: Garage = {
      id: Date.now().toString(),
      name,
      carCount: 0,
      imageUrl: "",
      ownerId: "user1",
      isShared: false,
    };
    onGarageCreated(newGarage);
    setName("");
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Create New Garage</Text>
          <TextInput
            style={styles.input}
            placeholder="Garage name"
            value={name}
            onChangeText={setName}
          />
          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCreate}
              style={styles.createButton}
            >
              <Text style={styles.createText}>Create</Text>
            </TouchableOpacity>
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
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  actions: { flexDirection: "row", justifyContent: "flex-end" },
  cancelButton: { paddingVertical: 8, paddingHorizontal: 14 },
  cancelText: { color: "#888", fontSize: 16 },
  createButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  createText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
