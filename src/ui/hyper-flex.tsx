import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export const FlexRow = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  const baseStyles = "flex items-center justify-center";
  return <div className={cn(baseStyles, className)}>{children}</div>;
};
