/**
 * Shared constants for code display components
 * Single source of truth for measurements to ensure seamless transitions
 * between CodeView and DiffView
 */

export const CODE_DISPLAY_CONSTANTS = {
  // Typography
  fontFamily: "JetBrains Mono, Fira Code, Consolas, monospace",
  fontSize: "0.95rem",
  fontWeight: "normal",
  lineHeight: "1.6",

  // Layout measurements
  lineNumberMinWidth: "50px",
  lineNumberPaddingRight: "10px",

  // Colors
  lineNumberColor: "#858585",

  // Diff highlighting
  diffAddedBackground: "rgba(100, 200, 100, 0.2)",
  diffRemovedBackground: "rgba(255, 100, 100, 0.2)",
} as const;

/**
 * Convert constants to CSS custom properties for runtime use
 */
export const CODE_DISPLAY_CSS_VARS = {
  "--code-font-family": CODE_DISPLAY_CONSTANTS.fontFamily,
  "--code-font-size": CODE_DISPLAY_CONSTANTS.fontSize,
  "--code-font-weight": CODE_DISPLAY_CONSTANTS.fontWeight,
  "--code-line-height": CODE_DISPLAY_CONSTANTS.lineHeight,
  "--code-line-number-width": CODE_DISPLAY_CONSTANTS.lineNumberMinWidth,
  "--code-line-number-padding": CODE_DISPLAY_CONSTANTS.lineNumberPaddingRight,
  "--code-line-number-color": CODE_DISPLAY_CONSTANTS.lineNumberColor,
} as const;
