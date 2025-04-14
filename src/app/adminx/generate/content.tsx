"use client";

import { useActionState } from "react";
import { addStation } from "@/lib/firebase/add-station";
import { gsec } from "@/app/_lib/utils";
import toast from "react-hot-toast";
import { QRViewer } from "./qr-viewer";
import { getUID } from "@/app/actions";
import { useAuth } from "@/app/_ctx/auth";
import { QrForm } from "./qr-form";

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

    const promise = addStation(gsec(), {
      params: { id, param1, param2 },
      url: data.qrUrl,
      data: data.qrData,
      createdBy: await getUID(),
    });

    await toast.promise(promise, {
      loading: "Generating...",
      success: "Successful!",
      error: "Failed to generate QR.",
    });
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
      <div className="w-full px-2 md:max-w-lg lg:max-w-4xl mx-auto space-y-4">
        <div className="w-full space-y-4">
          <div className="px-3 text-xl font-bold pt-5 tracking-tighter">
            Generate QR Code
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-y-12 grid-cols-1 w-full md:border-y md:border-r-[0.33px] md:rounded-[58px] border-gray-200/20 p-4 gap-4">
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
            <button
              className="border border-gray-200/40 h-7 text-orange-400 tracking-tight font-sans rounded-lg px-2 flex items-center justify-center"
              onClick={logout}
            >
              <span>sign out</span>
            </button>
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
