import Image from "next/image";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <Image alt="loader" src="/svg/spinner.svg" width={32} height={32} />
    </div>
  );
};
