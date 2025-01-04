// Breakpoint types and utilities
export const breakpoints = {
  mobile: 320,
  tablet: 481,
  laptop: 769,
  desktop: 1025,
} as const

// Type-safe breakpoint keys
export type Breakpoint = keyof typeof breakpoints 