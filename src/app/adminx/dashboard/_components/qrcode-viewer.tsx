import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { QrCode } from "@/app/_lib/qr-gen";
import { Icon, IconName } from "@/lib/icons";
import { use, useMemo, useRef } from "react";
import { AffiliateCtx } from "@/app/_ctx/affiliate";
import { HyperList } from "@/ui/hyper-list";
import { useQrcode } from "../_hooks/use-qrcode";

export const QRCodeViewer = () => {
  const { qrCodeUrl, qrCodeList } = use(AffiliateCtx)!;

  const qrRef = useRef<HTMLDivElement | null>(null);

  const { copy, download, print, share } = useQrcode(
    qrRef,
    qrCodeList?.[0].ident,
  );
  const actions = useMemo(
    () =>
      [
        {
          icon: "link",
          label: "Copy link",
          onClick: copy(qrCodeUrl),
        },
        {
          icon: "download",
          label: "Download",
          onClick: download,
        },
        {
          icon: "printer",
          label: "Print",
          onClick: print,
        },
        {
          icon: "share",
          label: "Share",
          onClick: share,
        },
      ] as IActionButton[],
    [copy, download, print, share, qrCodeUrl],
  );
  return (
    <Card
      className={cn(
        "bg-gradient-to-b h-full from-ultra-fade/50 to-super-fade",
        "dark:border-panel lg:rounded-lg lg:rounded-bl-[3px] rounded-none rounded-s-xl border-[0.33px] border-gray-500 border-e-0 lg:border-e-[0.33px]",
        "dark:from-neutral-500/60 dark:via-neutral-300/80 dark:to-90% dark:to-neutral-300/50",
        "overflow-hidden relative flex flex-col justify-between",
      )}
    >
      <div className="absolute top-16 left-12 size-80 bg-neutral-50/80 rounded-full blur-[40px] opacity-80"></div>
      <div className="absolute -top-28 -left-28 size-64 dark:bg-neutral-100 rounded-full blur-[80px] opacity-40"></div>
      <div className="absolute -top-20 -left-0 size-56 bg-amber-50/40 rounded-full blur-[80px] opacity-20"></div>
      <div className="absolute bottom-4 right-2 w-96 h-16 dark:bg-neutral-600/50 bg-neutral-50 rounded-full blur-[80px] opacity-80"></div>

      <CardHeader className="flex font-sans relative flex-row dark:border-hot-dark items-start h-12 justify-between">
        <div className="flex h-full items-center font-sans gap-3 lg:gap-6">
          <CardTitle className="lg:text-xl ps-2 font-semibold text-[16px] lg:font-medium leading-none dark:portrait:text-blue-400 h-12 flex items-center font-sans tracking-tight px-3">
            QR Codes
          </CardTitle>
          <div className="font-sans relative flex items-center justify-center">
            <Icon name="square" solid size={24} className="absolute" />
            <span className="bg-panel dark:bg-ultra-fade text-xs flex items-center justify-center size-3.5 dark:text-panel text-ultra-fade absolute z-10">
              {qrCodeList?.length ?? 0}
            </span>
          </div>
        </div>

        <div className="flex items-start justify-center h-full">
          <button className="hover:opacity-100 opacity-60">
            <Icon name="maximize-square" size={24} />
          </button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col lg:h-full items-center p-0 relative z-[50]">
        <div
          ref={qrRef}
          className="flex items-start relative z-[50] justify-center"
        >
          {qrCodeUrl && <QrCode url={qrCodeList?.[0].url ?? qrCodeUrl} />}
        </div>
        <div className="flex flex-1 size-full border-y-[0.0px] items-center border-gray-400/60 dark:border-zinc-600 px-2 lg:px-6">
          {qrCodeUrl && (
            <HyperList
              data={actions}
              component={ActionButton}
              container="grid grid-cols-4 py-2 w-full h-full"
              delay={0.5}
              direction="up"
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
      className="flex flex-col group lg:space-y-2.5 space-y-1.5 items-center cursor-pointer tracking-tight font-sans justify-center w-full h-full hover:opacity-100 opacity-80"
    >
      <Icon
        solid
        name={icon}
        className="dark:group-hover:text-teal-300 size-5 lg:size-6 group-hover:text-teal-500"
      />
      <p className="text-xs">{label}</p>
    </button>
  );
};
