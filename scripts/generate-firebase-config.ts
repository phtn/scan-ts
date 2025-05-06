import { loadEnvConfig } from "@next/env";
import { writeFileSync } from "fs";
import { join } from "path";

// Load environment variables using Next.js env loader
const projectDir = process.cwd();
const { combinedEnv, loadedEnvFiles } = loadEnvConfig(projectDir);

if (loadedEnvFiles.length === 0) {
  console.warn("⚠️ No env files loaded, using process.env");
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

  // Check both combinedEnv and process.env
  const env = { ...process.env, ...combinedEnv };
  const missingVars = requiredVars.filter((v) => !env[v]);

  if (missingVars.length > 0) {
    console.error(
      "❌ Missing required environment variables:",
      missingVars.join(", "),
    );
    process.exit(1);
  }

  return {
    apiKey: env.NEXT_PUBLIC_F_APIKEY,
    authDomain: env.NEXT_PUBLIC_F_AUTHDOMAIN,
    projectId: env.NEXT_PUBLIC_F_PROJECTID,
    storageBucket: env.NEXT_PUBLIC_F_STORAGEBUCKET,
    messagingSenderId: env.NEXT_PUBLIC_F_MESSAGINGSENDERID,
    appId: env.NEXT_PUBLIC_F_APPID,
    measurementId: env.NEXT_PUBLIC_F_MEASUREMENTID,
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
