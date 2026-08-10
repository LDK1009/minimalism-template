export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
} as const;

export type RadiusToken = (typeof radii)[keyof typeof radii];
