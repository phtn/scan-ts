import { getInitials } from "../_lib/utils";

interface TitleProps {
  un: string | undefined;
}

export const Title = ({ un }: TitleProps) => {
  return (
    <div className="absolute top-0 text-xs p-4 font-sans left-0 w-full h-full">
      $ &nbsp;{" "}
      <span className="opacity-50">{getInitials(un) ?? "admin"} _</span>
    </div>
  );
};
