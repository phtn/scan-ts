// import { NextResponse } from "next/server";
// import QRCode from "qrcode";

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id") ?? "default";
//     const param1 = searchParams.get("param1") ?? "";
//     const param2 = searchParams.get("param2") ?? "";

//     // Create the URL to encode in the QR code
//     // This URL will point to your app and include the parameters
//     const baseUrl =
//       process.env.NODE_ENV === "production"
//         ? "https://scan-ts.vercel.app"
//         : "https://localhost:3000";
//     const qrUrl = `${baseUrl}?id=${id}&param1=${param1}&param2=${param2}`;

//     // Generate QR code as data URL
//     const qrData = await QRCode.toDataURL(qrUrl);

//     return NextResponse.json({ qrUrl, qrData });
//   } catch (error) {
//     console.error("Error generating QR code:", error);
//     return NextResponse.json(
//       { error: "Failed to generate QR code" },
//       { status: 500 },
//     );
//   }
// }
