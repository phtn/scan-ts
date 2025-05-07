"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { type ReactNode } from "react";
import { SettingsCtxProvider } from "./settings";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SettingsCtxProvider>{children}</SettingsCtxProvider>
    </ThemeProvider>
  );
};
