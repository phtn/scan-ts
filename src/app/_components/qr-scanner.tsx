import {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
  RefObject,
} from "react";

interface QRCode {
  data: string;
  location: {
    topLeftCorner: Point;
    topRightCorner: Point;
    bottomRightCorner: Point;
    bottomLeftCorner: Point;
  };
}

interface Point {
  x: number;
  y: number;
}

interface JsQR {
  (
    data: Uint8ClampedArray,
    width: number,
    height: number,
    options?: {
      inversionAttempts?: "dontInvert" | "onlyInvert" | "attemptBoth";
    },
  ): QRCode | null;
}

interface QRScannerProps {
  onScan: (data: string) => void;
}

const VideoElement = memo(
  ({ videoRef }: { videoRef: RefObject<HTMLVideoElement | null> }) => (
    <video ref={videoRef} className="w-full max-w-sm" playsInline />
  ),
);

const CanvasElement = memo(
  ({ canvasRef }: { canvasRef: RefObject<HTMLCanvasElement | null> }) => (
    <canvas ref={canvasRef} className="absolute top-0 left-0 invisible" />
  ),
);

VideoElement.displayName = "VideoElement";
CanvasElement.displayName = "CanvasElement";

export default function QRScanner({ onScan }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null); // Add this line
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isComponentMounted, setIsComponentMounted] = useState(true);

  const scanQRCode = useCallback(
    (jsQR: JsQR) => {
      if (!videoRef.current || !canvasRef.current || !scanning) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (
        !(context instanceof CanvasRenderingContext2D) ||
        video.readyState !== video.HAVE_ENOUGH_DATA
      ) {
        requestAnimationFrame(() => scanQRCode(jsQR));
        return;
      }

      // Set canvas dimensions to match video
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;

      // Draw current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get image data for QR code detection
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        // QR code detected - stop scanning and call the callback
        setScanning(false);
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        onScan(code.data);
      } else {
        // Continue scanning
        requestAnimationFrame(() => scanQRCode(jsQR));
      }
    },
    [videoRef, canvasRef, scanning, onScan],
  );

  const startScanner = useCallback(
    (jsQR: JsQR) => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Camera access is not supported by your browser");
        return;
      }

      setScanning(true);

      if (videoRef.current) {
        videoRef.current.onerror = () => {
          setError("Video stream error occurred");
          setScanning(false);
        };
      }

      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          streamRef.current = stream; // Store the stream reference
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            requestAnimationFrame(() => scanQRCode(jsQR));
          }
        })
        .catch((err) => {
          setError("Could not access the camera: " + err.message);
          setScanning(false);
        });
    },
    [scanQRCode],
  );

  useEffect(() => {
    setIsComponentMounted(true);

    // Dynamic import of jsQR to avoid SSR issues
    const loadScanner = async () => {
      if (!isComponentMounted) return;

      try {
        const jsQR = (await import("jsqr")).default as JsQR;
        startScanner(jsQR);
      } catch (err) {
        if (isComponentMounted) {
          setError("Failed to load QR scanner library");
          console.error(err);
        }
      }
    };

    loadScanner();

    return () => {
      setIsComponentMounted(false);
      // Use streamRef for cleanup
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [startScanner, isComponentMounted]);

  return (
    <div className="flex flex-col items-center">
      {error ? (
        <div className="p-4 bg-red-100 text-red-800 rounded-md">{error}</div>
      ) : (
        <>
          <div className="relative mb-4 border-4 border-blue-500 rounded-lg overflow-hidden">
            <VideoElement videoRef={videoRef} />
            <CanvasElement canvasRef={canvasRef} />
            {scanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-4 border-white opacity-70 rounded-lg"></div>
              </div>
            )}
          </div>
          <p className="text-center text-gray-600">
            {scanning
              ? "Position QR code within the frame"
              : "Starting camera..."}
          </p>
        </>
      )}
    </div>
  );
}
