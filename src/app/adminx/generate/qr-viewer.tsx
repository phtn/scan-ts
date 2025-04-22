import { Button } from "@/app/_components/button";
import { copyFn } from "@/app/_lib/utils";
import html2canvas from "html2canvas";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

interface QRViewerProps {
  qrUrl: string | null;
  qrData: string | null;
}

export const QRViewer = ({ qrUrl, qrData }: QRViewerProps) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const generateImage = useCallback(async () => {
    if (imageUrl) {
      return imageUrl;
    }

    const options = {
      useCORS: true,
      logging: true,
      background: "#fff",
      removeContainer: true,
      removeContainerId: "receipt-container",
      retina: true,
      scale: 2,
      dpi: 144,
    };

    if (!qrRef.current) return null;
    const canvas = await html2canvas(qrRef.current, options);
    const dataUrl = canvas.toDataURL("image/png");
    setImageUrl(dataUrl);
    return dataUrl;
  }, [imageUrl]);

  const download = useCallback(async () => {
    if (!qrRef.current) return;
    const image = await generateImage();
    if (image) {
      const link = document.createElement("a");
      link.href = image;
      link.download = "autoprotect-scan-ts.png";
      link.click();
    }
  }, [generateImage]);

  const share = useCallback(async () => {
    const image = await generateImage();
    if (image) {
      // Convert data URL to Blob
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], `autoprotect-scan-ts.png`, {
        type: "image/png",
      });

      // Check if Web Share API is supported
      if (navigator.share) {
        try {
          await navigator.share({
            title: `AutoProtect QR Code`,
            text: "Scan QR this code.",
            files: [file],
          });
          console.log("QR code shared successfully");
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            console.log("User cancelled sharing");
            // Do nothing, user just cancelled
          } else {
            console.log("Error sharing receipt:", error);
            alert("Failed to share receipt. isProcessing instead.");
          }
          console.log("Error sharing receipt:", error);
        }
      } else {
        // Fallback for browsers that don't support the Web Share API
        alert(
          "Web Share API not supported in your browser. isProcessing instead.",
        );
        await download();
      }
    }
  }, [generateImage, download]);

  const copyUrl = useCallback(() => {
    if (!qrUrl) return;
    copyFn({ text: qrUrl, name: "URL link" });
  }, [qrUrl]);

  return (
    <div className="w-full border rounded-[42px]">
      <div className="flex items-center justify-center h-full">
        {qrData ? (
          <div className="flex flex-col justify-center space-y-8">
            <div ref={qrRef} className="p-2 bg-white rounded-xl w-full">
              <Image
                src={qrData}
                alt="QR Code"
                className="mx-auto aspect-square"
                width={300}
                height={300}
                unoptimized
                priority
              />
            </div>

            <div className="flex items-center font-sans font-semibold text-sm border h-6 justify-around">
              <Button onClick={copyUrl}>
                <span>copy link</span>
              </Button>
              <Button onClick={share}>
                <span>share</span>
              </Button>

              <Button onClick={download}>
                <span>download</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center font-sans tracking-tight h-64">
            QR result area
          </div>
        )}
      </div>
    </div>
  );
};
