import { copyFn } from "@/utils/helpers";
import html2canvas from "html2canvas-pro";
import { RefObject, useCallback, useState, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { addLog, Log } from "@/lib/firebase/add-log";
import { gsec } from "@/app/_lib/utils";

export const useQrcode = (
  ref: RefObject<HTMLDivElement | null>,
  ident: string | undefined,
) => {
  const [user] = useAuthState(auth);

  const logPayload = useMemo(
    () =>
      ({
        uid: user?.uid,
        name: user?.displayName?.split(" ").shift(),
        ref: ident,
        note: "qr-code",
      }) as Log,
    [ident, user],
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const log = useCallback(
    async (action: string) => {
      await addLog(gsec(), { ...logPayload, action });
    },
    [logPayload],
  );

  const generateImage = useCallback(async () => {
    if (imageUrl) {
      return imageUrl;
    }
    const options = {
      useCORS: true,
      logging: true,
      background: "rgba(255, 255, 255, 0)",
      removeContainer: true,
      retina: true,
      scale: 4,
    };

    if (!ref?.current) return null;
    const canvas = await html2canvas(ref.current, options);
    const dataUrl = canvas.toDataURL("image/png");
    setImageUrl(dataUrl);
    return dataUrl;
  }, [imageUrl, ref]);

  const download = useCallback(async () => {
    if (!ref?.current) return;
    const image = await generateImage();
    if (image) {
      const link = document.createElement("a");
      link.href = image;
      link.download = `${ident ?? "qr-code"}.png`;
      link.click();
      log("download");
    }
  }, [ident, log, generateImage, ref]);

  const share = useCallback(async () => {
    const image = await generateImage();
    if (image) {
      // Convert data URL to Blob
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], `${ident ?? "qr-code"}.png`, {
        type: "image/png",
      });

      // Check if Web Share API is supported
      if (navigator.share) {
        try {
          await navigator.share({
            title: `QR Code`,
            text: "QR code share",
            files: [file],
          });
          console.log("QR Code shared successfully");
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
        log("share");
      }
    }
  }, [log, download, generateImage, ident]);

  const copy = useCallback(
    (url: string | null) => async () => {
      if (!url) return;
      await copyFn({ name: "QR Code link", text: url });
      log("copy");
    },
    [log],
  );

  // const print = useCallback(() => {}, []);
  const print = useCallback(async () => {
    const image = await generateImage();
    if (!image) return;

    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      console.error("Popup blocked. Please allow popups for printing.");
      return;
    }

    // Create HTML content for printing
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body {
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }
            img {
              max-width: 500px;
              width: 100%;
              height: auto;
            }
            @media print {
              @page {
                size: auto;
                margin: 0;
              }
              body {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
              }
            }
          </style>
        </head>
        <body>
          <img src="${image}" alt="QR Code" />
          <script>
            window.onload = () => {
              setTimeout(() => {
                window.print();
                window.close();
              }, 200);
            };
          </script>
        </body>
      </html>
    `;

    // Write the HTML content and trigger print
    printWindow.document.writeln(html);
    printWindow.document.close();

    log("print");
  }, [generateImage, log]);

  return { download, share, copy, print };
};
