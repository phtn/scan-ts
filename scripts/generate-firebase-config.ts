import { config } from "dotenv";
import { writeFileSync } from "fs";
import { join, resolve } from "path";

// Load environment variables from project root
const env = process.env.NODE_ENV === "production" ? ".env" : ".env.local";
const envPath = resolve(process.cwd(), env);
const result = config({ path: envPath });

if (result.error) {
  console.error("⚠️ Error loading .env file", result.error);
  process.exit(1);
}

const getFirebaseConfig = () => {
  const requiredVars = [
    "NEXT_PUBLIC_F_APIKEY",
    "NEXT_PUBLIC_F_AUTHDOMAIN",
    "NEXT_PUBLIC_F_PROJECTID",
    "NEXT_PUBLIC_F_STORAGEBUCKET",
    "NEXT_PUBLIC_F_MESSAGINGSENDERID",
    "NEXT_PUBLIC_F_APPID",
  ];

  const envJson = result.parsed;
  const keys = Object.keys(envJson ?? {});

  const missingVars = requiredVars.filter((v) => !keys.includes(v));

  if (missingVars.length > 0) {
    console.error(
      "❌ Missing required environment variables:",
      missingVars.join(", "),
    );
    process.exit(1);
  }

  return {
    apiKey: process.env.NEXT_PUBLIC_F_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_F_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_F_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_F_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_F_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_F_APPID,
    measurementId: process.env.NEXT_PUBLIC_F_MEASUREMENTID,
  };
};

try {
  const config = getFirebaseConfig();
  const content = `const firebaseConfig = ${JSON.stringify(config, null, 2)};`;

  writeFileSync(
    join(process.cwd(), "public", "firebase-config.js"),
    content,
    "utf-8",
  );

  console.log("✅ Firebase config generated successfully!");
} catch (error) {
  console.error("❌ Error generating Firebase config:", error);
  process.exit(1);
}
