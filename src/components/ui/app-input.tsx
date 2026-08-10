import { StyleSheet, View } from "react-native";
import { Text as PaperText, TextInput } from "react-native-paper";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

type AppInputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  errorMessage?: string;
};

export function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  errorMessage,
}: AppInputProps) {
  const hasError = Boolean(errorMessage);

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        error={hasError}
        outlineColor={colors.mist}
        activeOutlineColor={colors.ink}
        textColor={colors.ink}
        placeholderTextColor={colors.graphite}
        style={styles.input}
      />
      {errorMessage ? (
        <PaperText style={styles.errorMessage}>{errorMessage}</PaperText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  input: {
    backgroundColor: colors.white,
  },
  errorMessage: {
    ...typography.caption,
    color: colors.ink,
    paddingHorizontal: spacing.xs,
  },
});
