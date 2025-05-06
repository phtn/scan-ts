"use client";

import { Icon } from "@/lib/icons";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { useId } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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

export function ToggleSwitch() {
  const id = useId();
  const { setTheme, theme } = useTheme();
  const [checked, setChecked] = useState(theme === "light");

  useEffect(() => {
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [checked, setTheme]);

  return (
    <div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={setChecked}
        className="lg:hidden scale-80"
      />
      <div className="relative hidden lg:inline-grid h-6 grid-cols-[1fr_1fr] items-center border-[0.33px] border-neutral-400/80 dark:border-zinc-600/80 rounded-sm font-medium">
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={setChecked}
          className="peer data-[state=unchecked]:bg-input cursor-pointer absolute inset-0 h-[inherit] w-[60px] rounded-sm [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-sm [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
        />
        <span className="pointer-events-none font-quick relative flex items-center justify-center ps-1.5 pe-1 text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
          <span className="text-[10px] uppercase">Off</span>
        </span>
        <span className="pointer-events-none relative flex items-center justify-center px-1 text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
          <span className="text-[10px] text-orange-300 uppercase">On</span>
        </span>
      </div>
      <Label htmlFor={id} className="sr-only">
        dark
      </Label>
    </div>
  );
}
