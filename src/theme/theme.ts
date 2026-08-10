import {
  MD3LightTheme,
  type MD3Theme,
} from "react-native-paper";

import { colors } from "./colors";
import { typography } from "./typography";

export const paperTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.ink,
    onPrimary: colors.white,
    primaryContainer: colors.mist,
    onPrimaryContainer: colors.ink,
    secondary: colors.graphite,
    onSecondary: colors.white,
    secondaryContainer: colors.paper,
    onSecondaryContainer: colors.ink,
    background: colors.white,
    onBackground: colors.ink,
    surface: colors.white,
    onSurface: colors.ink,
    surfaceVariant: colors.paper,
    onSurfaceVariant: colors.charcoal,
    outline: colors.mist,
    outlineVariant: colors.mist,
  },
  fonts: {
    ...MD3LightTheme.fonts,
    displayLarge: {
      ...MD3LightTheme.fonts.displayLarge,
      ...typography.display,
    },
    headlineLarge: {
      ...MD3LightTheme.fonts.headlineLarge,
      ...typography.title,
    },
    bodyLarge: {
      ...MD3LightTheme.fonts.bodyLarge,
      ...typography.body,
    },
    bodySmall: {
      ...MD3LightTheme.fonts.bodySmall,
      ...typography.caption,
    },
  },
};
