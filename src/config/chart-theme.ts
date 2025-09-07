// Chart theme configuration for Recharts and other chart libraries
export const chartColors = {
  light: {
    primary: "#2563eb",
    secondary: "#64748b",
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
    background: "#ffffff",
    foreground: "#0f172a",
  },
  dark: {
    primary: "#3b82f6",
    secondary: "#94a3b8",
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
    background: "#020817",
    foreground: "#f8fafc",
  },
};

export const getChartColors = (theme: "light" | "dark") => {
  return chartColors[theme];
};
