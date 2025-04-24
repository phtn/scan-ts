import Image from "next/image";

export default function UserProfile() {
  return (
    <div className="fixed bottom-0 left-0 w-60 p-4 bg-[#1a2234] border-t border-gray-800">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
          <Image
            src="/svg/spinner.svg"
            alt="User avatar"
            className="size-5"
            width={0}
            height={0}
            unoptimized
          />
        </div>
        <div>
          <div className="text-sm font-medium">Ginger Spice</div>
          <div className="text-xs text-gray-400">gspice@gmail.com</div>
        </div>
      </div>
    </div>
  );
}
