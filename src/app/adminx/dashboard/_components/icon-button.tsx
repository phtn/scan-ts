import { type ClassName } from "@/app/types";
import { Icon, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  icon: IconName;
  iconStyle?: string;
  className?: ClassName;
  hasUnread?: boolean;
}
export function IconButton({
  icon,
  iconStyle,
  className,
  hasUnread = false,
}: IconButtonProps) {
  return (
    <button
      className={cn(
        "lg:size-9 size-7 flex items-center justify-center rounded-lg bg-gray-300/60 dark:bg-panel relative",
        className,
      )}
    >
      <Icon
        name={icon}
        className={cn(
          "lg:size-6 size-4 text-neutral-500 dark:text-gray-300",
          iconStyle,
        )}
      />
      {hasUnread && (
        <span className="absolute top-0 right-0 border-hot-dark border-2 size-3 bg-red-400 rounded-full"></span>
      )}
    </button>
  );
}
