import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

export const Button = ({
  className,
  children,
  onClick,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        "border cursor-pointer hover:bg-gray-300/15 border-gray-200/40 h-7 text-xs rounded-lg px-2 flex items-center justify-center font-quick whitespace-nowrap",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
