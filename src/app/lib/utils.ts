import FingerprintJS from "@fingerprintjs/fingerprintjs";

export type DeviceProfile = {
  userAgent: string;
  creds: Credential | null;
  cores: number | null;
  screen: {
    width: number;
    height: number;
    pixelRatio: number;
  };
  hasTouch: boolean;
  timezone: string;
  canvasFingerprint: string;
  webglVendor?:
    | {
        vendor: string;
        renderer: string;
      }
    | "unavailable"
    | "not-supported"
    | "error";
  fingerprintId: string;
};

export async function getDeviceProfile(ref: HTMLCanvasElement | null) {
  const userAgent = navigator.userAgent;
  const creds = await navigator.credentials.get();
  const cores = navigator.hardwareConcurrency;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const pixelRatio = window.devicePixelRatio || 1;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const canvasFingerprint = getCanvasFingerprint(ref);

  const fp = await FingerprintJS.load();
  const result = await fp.get();

  const results = {
    userAgent,
    creds,
    cores,
    screen: {
      width: screenWidth,
      height: screenHeight,
      pixelRatio,
    },
    hasTouch,
    timezone,
    canvasFingerprint,
    fingerprintId: result.visitorId,
  } satisfies DeviceProfile;

  return results;
}

// Canvas fingerprinting
function getCanvasFingerprint(canvasRef: HTMLCanvasElement | null) {
  if (!canvasRef) return "not-supported";
  try {
    const ctx = canvasRef.getContext("2d") as CanvasRenderingContext2D;
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText("Hello, 🍪!", 2, 15);
    return canvasRef.toDataURL();
  } catch (err) {
    console.log(err);
    return "not-supported";
  }
}
