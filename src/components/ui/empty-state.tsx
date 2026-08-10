import { StyleSheet, View } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

import { AppText } from "./app-text";
import { PrimaryButton } from "./primary-button";

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

const noop = () => undefined;

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <AppText variant="title">{title}</AppText>
      {description ? (
        <AppText variant="body" style={styles.description}>
          {description}
        </AppText>
      ) : null}
      {actionLabel ? (
        <View style={styles.action}>
          <PrimaryButton
            label={actionLabel}
            onPress={onAction ?? noop}
            disabled={!onAction}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    backgroundColor: colors.white,
  },
  description: {
    marginTop: spacing.sm,
    color: colors.graphite,
    textAlign: "center",
  },
  action: {
    marginTop: spacing.lg,
    alignSelf: "stretch",
  },
});
