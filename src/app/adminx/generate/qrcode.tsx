import html2canvas from "html2canvas";
import Image from "next/image";
import Link from "next/link";
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

  const handleDownload = useCallback(async () => {
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
            title: `Big Ticket Payment Receipt`,
            text: "Your payment receipt",
            files: [file],
          });
          console.log("Receipt shared successfully");
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
        await handleDownload();
      }
    }
  }, [generateImage, handleDownload]);
  return (
    <div>
      <div className="mt-6 text-center md:w-3xl">
        {qrData && (
          <div>
            <div className="px-5 h-12 flex items-center justify-between">
              <h2 className="font-medium tracking-tighter mb-2">
                Your QR Code
              </h2>
              <button
                onClick={handleDownload}
                className="border size-7 rounded-lg flex items-center justify-center"
              >
                <span className="rotate-90">&rarr;</span>
              </button>
            </div>
            <div
              ref={qrRef}
              className="inline-block p-2 bg-white rounded-lg shadow-md"
            >
              <Image
                src={qrData}
                alt="QR Code"
                className="mx-auto"
                width={285}
                height={280}
                unoptimized
                priority
              />
            </div>
            <div className="px-14">
              {qrUrl && (
                <Link
                  href={qrUrl}
                  className="mt-2 text-xs text-blue-400 break-all"
                >
                  {qrUrl}
                </Link>
              )}
            </div>
            <div className="h-12"></div>
            <button
              className="h-12 border border-gray-300/30 rounded-2xl"
              onClick={share}
            >
              <span className="mt-4 text-sm px-4 opacity-80">
                Share QR Code
              </span>
            </button>

            <div className="h-12"></div>
          </div>
        )}
      </div>
    </div>
  );
};
