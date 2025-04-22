import { cn } from "@/lib/utils";
import type { ClassName } from "../types";

interface HeaderProps {
  children?: React.ReactNode;
  className?: ClassName;
}

export const Header = ({ children, className }: HeaderProps) => {
  return (
    <header
      className={cn("flex items-center h-16 px-4 justify-between", className)}
    >
      {children}
    </header>
  );
};
