// File: src/app/api/submit-user-data/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { phoneNumber, name, email, qrParams } = data;

    // Validate required fields
    if (!phoneNumber || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Here you would typically:
    // 1. Validate the data more thoroughly
    // 2. Store the data in your database
    // 3. Maybe send notifications or trigger other processes

    console.log("User data received:", { phoneNumber, name, email, qrParams });

    // Mock database storage
    // In a real app, you would use a database client here
    // Example: await db.users.create({ data: { phoneNumber, name, email, ...qrParams } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing user data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
