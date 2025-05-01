import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { QrCode } from "@/app/_lib/qr-gen";
import { Icon, IconName } from "@/lib/icons";
import { use, useMemo } from "react";
import { AffiliateCtx } from "@/app/_ctx/affiliate";
import { HyperList } from "@/ui/hyper-list";

export const QRCodeViewer = () => {
  const { qrCodeUrl } = use(AffiliateCtx)!;
  const actions = useMemo(
    () =>
      [
        {
          icon: "link",
          label: "Copy link",
          onClick: () => console.log("Edit"),
        },
        {
          icon: "download",
          label: "Download",
          onClick: () => console.log("Delete"),
        },
        {
          icon: "printer",
          label: "Print",
          onClick: () => console.log("Delete"),
        },
        {
          icon: "share",
          label: "Share",
          onClick: () => console.log("Delete"),
        },
      ] as IActionButton[],
    [],
  );
  return (
    <Card
      className={cn(
        "bg-gradient-to-b h-full from-ultra-fade/50 to-super-fade",
        "dark:border-panel rounded-lg rounded-br-[3px] border-[0.33px] border-gray-500",
        "dark:from-neutral-500/60 dark:via-neutral-300/80 dark:to-90% dark:to-neutral-300/50",
        "overflow-hidden relative",
      )}
    >
      <div className="absolute top-24 left-24 size-56 bg-amber-50/80 rounded-full blur-[80px] opacity-80"></div>
      <div className="absolute -top-28 -left-28 size-64 dark:bg-neutral-100 rounded-full blur-[80px] opacity-40"></div>
      <div className="absolute -top-20 -left-0 size-56 bg-amber-50/40 rounded-full blur-[80px] opacity-20"></div>
      {/* <div className="absolute -bottom-[36rem] -right-0 w-[50rem] h-[47rem] bg-white/50 rounded-full blur-[60px] opacity-80"></div> */}

      <CardHeader className="flex font-sans relative flex-row dark:border-hot-dark items-start h-1/8 justify-between pb-2">
        <div className="flex h-full items-center gap-6">
          <CardTitle className="text-lg ps-6 font-medium leading-none h-12 flex items-center font-sans tracking-tight px-3">
            QR Code Viewer
          </CardTitle>
        </div>

        <div className="flex items-start justify-center h-full gap-6 p-2">
          <button className="hover:opacity-100 opacity-60">
            <Icon name="maximize" solid size={20} />
          </button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col h-5/6 items-center p-0 relative z-[50] justify-between w-full">
        <div className="flex items-center relative z-[50] pt-2 justify-center w-full">
          {qrCodeUrl && <QrCode url={qrCodeUrl} />}
        </div>
        <div className="flex w-full h-full border-t-[0.0px] items-end border-gray-400/60 dark:border-zinc-600">
          {qrCodeUrl && (
            <HyperList
              data={actions}
              component={ActionButton}
              container="grid grid-cols-4 pt-4 w-full h-full"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface IActionButton {
  icon: IconName;
  onClick: () => void;
  label: string;
}

const ActionButton = ({ icon, label, onClick }: IActionButton) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col group space-y-1.5 items-center cursor-pointer tracking-tight font-sans justify-center w-full h-full hover:opacity-100 opacity-60"
    >
      <Icon
        name={icon}
        solid
        size={24}
        className="dark:group-hover:text-blue-300 group-hover:text-blue-400"
      />
      <p className="text-xs">{label}</p>
    </button>
  );
};
