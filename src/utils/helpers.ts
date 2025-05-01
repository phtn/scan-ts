import crypto from "crypto";
import { type ReactElement } from "react";

export const opts = (...args: (ReactElement | null)[]) => {
  return new Map([
    [true, args[0]],
    [false, args[1]],
  ]);
};

export const formatMobile = (mobile_number: string) => {
  const regex = /^0|^(63)|\D/g;
  if (mobile_number) {
    const formattedNumber = mobile_number.replace(regex, "");
    return `+63${formattedNumber}`;
  }
  return "";
};

export function secureRef(length: number) {
  const byteLength = Math.ceil(length / 2); // Calculate required bytes
  const randomBytes = crypto.randomBytes(byteLength);
  const randomString = randomBytes.toString("hex").slice(0, length); // Convert to hex and truncate
  return randomString;
}

export function moses(str: string) {
  const middleIndex = Math.floor(str.length / 2);
  const firstHalf = str.substring(0, middleIndex);
  const secondHalf = str.substring(middleIndex);
  return firstHalf + "-" + secondHalf;
}
