"use client";

import { useTheme } from "next-themes";
import { createContext, useContext, useEffect, useState } from "react";

type ChartTheme = "light" | "dark" | "system";

interface ChartThemeContextI {
  theme: ChartTheme | undefined;
}

export const ChartThemeContext = createContext<ChartThemeContextI>({
  theme: undefined,
});

export function ChartThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme: modeTheme } = useTheme();
  const [theme, setTheme] = useState<ChartTheme>("system");

  useEffect(() => {
    // Set theme based on system theme
    if (modeTheme === "dark" || modeTheme === "light") {
      setTheme(modeTheme);
    } else {
      setTheme("system");
    }
  }, [modeTheme]);

  return (
    <ChartThemeContext.Provider
      value={{
        theme,
      }}
    >
      {children}
    </ChartThemeContext.Provider>
  );
}

export const useChartTheme = () => {
  const context = useContext(ChartThemeContext);

  if (context === undefined) {
    throw new Error("useChartTheme must be used within a ChartThemeProvider");
  }

  return context;
};