import FingerprintJS from "@fingerprintjs/fingerprintjs";
import crypto from "crypto";
import { onError, onSuccess, onWarn } from "../_ctx/toast";

export type DeviceProfile = {
  userAgent: string;
  cores: number | null;
  screen: {
    width: number;
    height: number;
    pixelRatio: number;
  };
  hasTouch: boolean;
  timezone: string;
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
  const cores = navigator.hardwareConcurrency;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const pixelRatio = window.devicePixelRatio || 1;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const canvasFingerprint = getCanvasFingerprint(ref);
  console.log(canvasFingerprint.length);

  const fp = await FingerprintJS.load();
  const result = await fp.get();

  const results = {
    userAgent,
    cores,
    screen: {
      width: screenWidth,
      height: screenHeight,
      pixelRatio,
    },
    hasTouch,
    timezone,
    fingerprintId: result.visitorId,
  } satisfies DeviceProfile;

  return results;
}

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

const s = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

export const guid = () =>
  `${s()}${s()}-${s()}-${s()}-${s()}-${s()}${s()}${s()}`;

export function gsec(length = 20) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = crypto.randomBytes(length);
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}

export const getInitials = (name: string | undefined) => {
  if (!name) return;

  const words = name.split(" ");

  if (words.length === 1) {
    return name.slice(0, 2);
  }

  if (words.length === 2) {
    return words[0]!.charAt(0) + words[1]!.charAt(0);
  }

  if (words.length >= 3) {
    return words[0]!.charAt(0) + words[words.length - 1]!.charAt(0);
  }
};

export type CopyFnParams = {
  name: string;
  text: string;
  limit?: number;
};
type CopyFn = (params: CopyFnParams) => Promise<boolean>; // Return success
export const copyFn: CopyFn = async ({ name, text }) => {
  if (!navigator?.clipboard) {
    onWarn("Clipboard not supported");
    return false;
  }
  if (!text) return false;

  return await navigator.clipboard
    .writeText(text)
    .then(() => {
      onSuccess(`${name ? "Copied: " + name : "Copied."}`);
      return true;
    })
    .catch((e) => {
      onError(`Copy failed. ${e}`);
      return false;
    });
};
