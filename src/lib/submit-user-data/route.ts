// import { SubmitPayload } from "@/app/hooks/use-form";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const apiKey = process.env.RE_UP_API_KEY!;
//   if (apiKey !== request.headers.get("X-Api-Key")) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const data = (await request.json()) as SubmitPayload;
//     const { user, station, device } = data;

//     // Validate required fields
//     if (!user) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 },
//       );
//     }

//     console.log(data);

//     // Here you would typically:
//     // 1. Validate the data more thoroughly
//     // 2. Store the data in your database
//     // 3. Maybe send notifications or trigger other processes

//     console.log("User data received:", { user, station, device });

//     // Mock database storage
//     // In a real app, you would use a database client here
//     // Example: await db.users.create({ data: { phoneNumber, name, email, ...qrParams } });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error processing user data:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }
