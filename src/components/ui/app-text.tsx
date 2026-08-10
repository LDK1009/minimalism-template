import type { ReactNode } from "react";
import type { StyleProp, TextStyle } from "react-native";
import { StyleSheet } from "react-native";
import { Text as PaperText } from "react-native-paper";

import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

type AppTextVariant = keyof typeof typography;

type AppTextProps = {
  children: ReactNode;
  variant?: AppTextVariant;
  style?: StyleProp<TextStyle>;
};

export function AppText({
  children,
  variant = "body",
  style,
}: AppTextProps) {
  return (
    <PaperText style={[styles.text, typography[variant], style]}>
      {children}
    </PaperText>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.ink,
  },
});
