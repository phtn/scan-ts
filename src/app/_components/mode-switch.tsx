import { Icon } from "@/lib/icons";
import { useTheme } from "next-themes";
import { useCallback } from "react";

export const ModeSwitch = () => {
  const { setTheme, theme } = useTheme();
  const handleThemeSet = useCallback(
    (theme: string) => async () => {
      setTheme(theme);
    },
    [setTheme],
  );
  return (
    <button
      onClick={handleThemeSet(theme === "light" ? "dark" : "light")}
      className="flex cursor-pointer items-center justify-center gap-1"
    >
      <Icon name={theme === "light" ? "toggle-off" : "toggle-on"} />
      <span className="text-sm -mb-0.5 select-none dark:opacity-80 font-dm">
        {theme === "light" ? "dark" : "light"}
      </span>
    </button>
  );
};

export const ModeToggle = () => {
  const { setTheme, theme } = useTheme();
  const handleThemeSet = useCallback(
    (theme: string) => async () => {
      setTheme(theme);
    },
    [setTheme],
  );
  return (
    <button
      onClick={handleThemeSet(theme === "light" ? "dark" : "light")}
      className="flex cursor-pointer items-center justify-center gap-1"
    >
      <Icon name={theme === "light" ? "toggle-off" : "toggle-on"} />
    </button>
  );
};
