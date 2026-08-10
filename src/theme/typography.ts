import type { TextStyle } from "react-native";

export const typography = {
  display: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
  },
} satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;
