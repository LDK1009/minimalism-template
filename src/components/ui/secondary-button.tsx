import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import { colors } from "@/theme/colors";
import { radii } from "@/theme/radii";
import { spacing } from "@/theme/spacing";

import type { ButtonProps } from "./primary-button";

export function SecondaryButton({
  label,
  onPress,
  disabled = false,
}: ButtonProps) {
  return (
    <Button
      mode="outlined"
      onPress={onPress}
      disabled={disabled}
      textColor={colors.ink}
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
    borderColor: colors.mist,
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
