"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from "react";
import { Icon } from "@/lib/icons";

const Checkbox = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer size-[18px] cursor-pointer shrink-0 rounded-sm border border-panel/50 dark:border-super-fade/30 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:data-[state=checked]:bg-super-fade dark:data-[state=checked]:border-super-fade data-[state=checked]:bg-panel data-[state=checked]:border-panel data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Icon
        name={props.checked === "indeterminate" ? "asterisk" : "confirm"}
        className={cn(`size-4 -ml-[2px]`, {
          "-ml-0 opacity-90 size-3 dark:text-teal-400 text-teal-700":
            props.checked === "indeterminate",
        })}
      />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
