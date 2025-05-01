"use client";

import { useCallback, useState } from "react";

export const useToggle = (initialState?: boolean) => {
  const [open, setOpen] = useState(initialState ?? false);
  const toggle = useCallback(() => {
    setOpen((v) => !v);
  }, [setOpen]);

  return { open, toggle };
};
