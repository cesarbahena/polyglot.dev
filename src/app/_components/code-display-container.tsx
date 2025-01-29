"use client";

import { type ReactNode, type CSSProperties } from "react";
import { CODE_DISPLAY_CSS_VARS } from "./code-display.constants";
import styles from "./code-display.module.css";

interface CodeDisplayContainerProps {
  children: ReactNode;
}

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
