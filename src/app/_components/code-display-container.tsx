"use client";

import { type ReactNode, type CSSProperties } from "react";
import { CODE_DISPLAY_CSS_VARS } from "./code-display.constants";
import styles from "./code-display.module.css";

interface CodeDisplayContainerProps {
  children: ReactNode;
}

/**
 * Unified container for code display components
 * Enforces consistent layout constraints and CSS custom properties
 * to ensure seamless transitions between CodeView and DiffView
 */
export function CodeDisplayContainer({ children }: CodeDisplayContainerProps) {
  return (
    <div
      className={styles.codeDisplay}
      style={CODE_DISPLAY_CSS_VARS as CSSProperties}
    >
      {children}
    </div>
  );
}
