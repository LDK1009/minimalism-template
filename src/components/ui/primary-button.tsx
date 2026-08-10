import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import { colors } from "@/theme/colors";
import { radii } from "@/theme/radii";
import { spacing } from "@/theme/spacing";

export type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function PrimaryButton({ label, onPress, disabled = false }: ButtonProps) {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      disabled={disabled}
      buttonColor={colors.ink}
      textColor={colors.white}
      style={styles.button}
      contentStyle={styles.content}
      labelStyle={styles.label}
    >
      {label}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radii.md,
  },
  content: {
    minHeight: 52,
    paddingHorizontal: spacing.lg,
  },
  label: {
    fontWeight: "700",
    textTransform: "none",
  },
});
