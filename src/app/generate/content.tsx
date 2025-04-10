"use client";

import { useState } from "react";
import Image from "next/image";

export function Content() {
  const [id, setId] = useState("");
  const [param1, setParam1] = useState("");
  const [param2, setParam2] = useState("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrData, setQrData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/generate-qr?id=${encodeURIComponent(id)}&param1=${encodeURIComponent(param1)}&param2=${encodeURIComponent(param2)}`,
      );

      if (!response.ok) {
        throw new Error("Failed to generate QR code");
      }

      const data = await response.json();
      setQrCode(data.qrCodeDataUrl);
      setQrData(data.qrData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Generate QR Code</h1>
          <p className="mt-2 text-gray-600">
            Create a QR code with custom parameters
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700"
            >
              Unique ID
            </label>
            <input
              id="id"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="param1"
              className="block text-sm font-medium text-gray-700"
            >
              Parameter 1
            </label>
            <input
              id="param1"
              type="text"
              value={param1}
              onChange={(e) => setParam1(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="param2"
              className="block text-sm font-medium text-gray-700"
            >
              Parameter 2
            </label>
            <input
              id="param2"
              type="text"
              value={param2}
              onChange={(e) => setParam2(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate QR Code"}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-red-100 text-red-800 rounded-md">{error}</div>
        )}

        {qrCode && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-medium mb-2">Your QR Code</h2>
            <div className="inline-block p-4 bg-white rounded-lg shadow-md">
              <Image
                src={qrCode}
                alt="QR Code"
                className="mx-auto"
                width={200}
                height={200}
                unoptimized
                priority
              />
            </div>
            {qrData && (
              <p className="mt-2 text-sm text-gray-600 break-all">
                <strong>Data:</strong> {qrData}
              </p>
            )}
            <p className="mt-4 text-sm">
              Scan this QR code with the app to submit user information
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
