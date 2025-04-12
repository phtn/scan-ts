"use client";

import { useActionState } from "react";
import { addStation } from "@/lib/firebase/add-station";
import { gsec } from "@/app/_lib/utils";
import toast from "react-hot-toast";
import { QRViewer } from "./qrcode";

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-fit px-4 h-9 text-[16px] font-semibold font-sans tracking-tighter border rounded-2xl border-transparent text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
    >
      {pending ? "Generating..." : "Generate QR Code"}
    </button>
  );
}

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
    });

    await toast.promise(promise, {
      loading: "Creating QR...",
      success: "Successful!",
      error: "Failed to save.",
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

  const [state, formAction, pending] = useActionState(
    generateQRCode,
    initialState,
  );

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="w-full px-2 max-w-md md:max-w-3xl mx-auto space-y-4">
        <div className="w-full space-y-4">
          <div className="px-3 text-xl font-bold pt-5 tracking-tighter">
            Generate QR Code
          </div>
        </div>

        <div className="md:flex w-full md:border-y md:border-r-[0.33px] md:rounded-[42px] border-gray-200/20 px-3 gap-4">
          <div className="bg-white h-full p-1.5 w-full pb-0 rounded-[42px]">
            <form action={formAction}>
              <div className="py-6 px-4 border-gray-500 border space-y-6 bg-gray-300 rounded-b-[20px] rounded-t-[38px]">
                <h2 className="text-lg font-medium tracking-tighter mb-4 text-slate-700">
                  Enter QR details.
                </h2>
                <div className="relative">
                  <label htmlFor="id" className={labelClassName}>
                    Unique ID
                  </label>
                  <input
                    id="id"
                    name="id"
                    type="text"
                    className={inputClassName}
                  />
                </div>

                <div className="relative">
                  <label htmlFor="param1" className={labelClassName}>
                    Parameter 1
                  </label>
                  <input
                    id="param1"
                    name="param1"
                    type="text"
                    className={inputClassName}
                  />
                </div>

                <div className="relative">
                  <label htmlFor="param2" className={labelClassName}>
                    Parameter 2
                  </label>
                  <input
                    id="param2"
                    name="param2"
                    type="text"
                    className={inputClassName}
                  />
                </div>
              </div>

              <div className="h-16 flex items-center justify-end px-4">
                <SubmitButton pending={pending} />
              </div>
            </form>
          </div>

          {state.error && (
            <div className="p-4 bg-red-100 text-red-800 rounded-md">
              {state.error}
            </div>
          )}

          <div className="h-20"></div>
          <QRViewer qrUrl={state.qrUrl} qrData={state.qrData} />
          <div className="bg-pink-50 h-20 w-full"></div>
          <div></div>
        </div>
      </div>
    </main>
  );
}

const inputClassName =
  "ps-3 font-sans tracking-tight text-lg block pt-5 h-16 w-full rounded-2xl bg-white border-gray-400 border focus:border-blue-500 focus:ring-blue-500 text-[#14141b]";
const labelClassName =
  "block font-sans absolute tracking-tighter text-xs -top-0 border-0 border-gray-300 rounded-md p-2 left-1 text-blue-950/60";

interface QrParams {
  error: string | null;
  qrUrl: string | null;
  qrData: string | null;
}
