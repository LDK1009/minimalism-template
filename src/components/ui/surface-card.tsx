import type { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Surface } from "react-native-paper";

import { colors } from "@/theme/colors";
import { radii } from "@/theme/radii";
import { spacing } from "@/theme/spacing";

type SurfaceCardProps = {
  children: ReactNode;
};

export function SurfaceCard({ children }: SurfaceCardProps) {
  return <Surface style={styles.card}>{children}</Surface>;
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.paper,
    elevation: 1,
  },
});
