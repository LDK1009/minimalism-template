export const colors = {
  ink: "#111111",
  charcoal: "#2B2B2B",
  graphite: "#666666",
  mist: "#D9D9D9",
  paper: "#F6F6F6",
  white: "#FFFFFF",
} as const;

export type ColorToken = (typeof colors)[keyof typeof colors];
