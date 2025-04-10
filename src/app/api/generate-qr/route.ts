import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") ?? "default";
    const param1 = searchParams.get("param1") ?? "";
    const param2 = searchParams.get("param2") ?? "";

    // Create the URL to encode in the QR code
    // This URL will point to your app and include the parameters
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://localhost:3000";
    const qrData = `${baseUrl}?id=${id}&param1=${param1}&param2=${param2}`;

    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(qrData);

    return NextResponse.json({ qrCodeDataUrl, qrData });
  } catch (error) {
    console.error("Error generating QR code:", error);
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 },
    );
  }
}
