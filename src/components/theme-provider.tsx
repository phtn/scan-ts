"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ComponentProps } from "react";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  const { theme } = useTheme();
  return (
    <NextThemesProvider {...props}>
      <div className={theme}>{children}</div>
    </NextThemesProvider>
  );
}
