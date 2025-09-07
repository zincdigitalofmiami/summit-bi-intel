"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ComponentProps } from "react";
import * as React from "react";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

export function ModeThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
