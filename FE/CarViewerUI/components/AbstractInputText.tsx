import { useTranslation } from "react-i18next";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type CustomTextInputProps = TextInputProps & {
  placeholderKey: string;
};

const AbstractInputText: React.FC<CustomTextInputProps> = ({
  placeholderKey,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <TextInput
      style={[styles.input, props.style]}
      placeholder={t(placeholderKey)}
      placeholderTextColor="#aaa"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "#23234b",
    color: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
});

export default AbstractInputText;
