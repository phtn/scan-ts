"use client";

import { useActionState } from "react";
import { QRViewer } from "./qr-viewer";
import { useAuth } from "@/app/_ctx/auth";
import { QrForm } from "./qr-form";
import { PageTitle } from "../components";
import { Button } from "@/app/_components/button";

// Define the action
async function generateQRCode(prevState: QrParams, formData: FormData) {
  const id = formData.get("id") as string;
  const param1 = formData.get("param1") as string;
  const param2 = formData.get("param2") as string;

  try {
    const response = await fetch(
      `/api/generate-qr?id=${encodeURIComponent(id)}&param1=${encodeURIComponent(param1)}&param2=${encodeURIComponent(param2)}`,
    );

    if (!response.ok) {
      throw new Error("Failed to generate QR code");
    }

    const data = (await response.json()) as {
      qrUrl: string | null;
      qrData: string | null;
    };

    return {
      error: null,
      qrUrl: data.qrUrl,
      qrData: data.qrData,
    };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "An error occurred",
      qrUrl: null,
      qrData: null,
    };
  }
}

export function Content() {
  const initialState = {
    error: null,
    qrUrl: null,
    qrData: null,
  };

  const [state, action, pending] = useActionState(generateQRCode, initialState);

  const { logout } = useAuth();

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="w-full px-2 md:max-w-lg lg:max-w-6xl mx-auto space-y-4">
        <PageTitle title="Generate QR Code" />

        <div className="grid lg:grid-cols-2 gap-y-12 grid-cols-1 w-full md:rounded-[58px] p-4 gap-24 bg-gradient-to-b from-mariana via-deep to-black">
          <QrForm action={action} pending={pending} />

          <QRViewer qrUrl={state.qrUrl} qrData={state.qrData} />
          <div />
          <div className="h-20 font-semibold text-sm flex items-center justify-end w-full pe-6">
            {state.error && (
              <div className="p-4 bg-red-100 text-red-800 rounded-md">
                {state.error}
              </div>
            )}
            <div className="h-20"></div>
            <Button onClick={logout}>
              <span className="text-orange-400">sign out</span>
            </Button>
          </div>
        </div>

        <div></div>
      </div>
    </main>
  );
}

interface QrParams {
  error: string | null;
  qrUrl: string | null;
  qrData: string | null;
}
