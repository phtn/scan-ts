import { useState } from "react";

interface UserFormProps {
  qrCodeData: string | null;
  onSubmit: VoidFunction;
}

export default function UserForm({ qrCodeData, onSubmit }: UserFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!qrCodeData) {
      return;
    }

    try {
      // Parse the QR code data to get any parameters
      // Assuming the QR code contains a URL like: https://yourdomain.com/api/submit?param1=value1&param2=value2
      const url = new URL(qrCodeData);
      // const apiPath = url.pathname;
      const params = Object.fromEntries(url.searchParams);

      const response = await fetch("/api/submit-user-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          name,
          email,
          qrParams: params,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      onSubmit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-1.5 pb-0 rounded-[42px]">
      <form onSubmit={handleSubmit}>
        <div className="py-6 px-4 border-gray-300 border space-y-6 bg-gray-200 rounded-b-[38px] rounded-t-[38px]">
          <h2 className="text-lg font-medium tracking-tighter mb-4 text-slate-700">
            Please enter your contact details.
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
              {error}
            </div>
          )}
          <div className="relative">
            <label
              htmlFor="lname"
              className="block font-sans absolute tracking-tighter text-xs -top-0 border-0 border-gray-300 rounded-md p-2 left-1 text-blue-950/60"
            >
              Name
            </label>
            <input
              id="lname"
              name="lname"
              type="text"
              value={name}
              autoComplete="family-name"
              onChange={(e) => setName(e.target.value)}
              required
              className={inputClassName}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="phone"
              className="block font-light font-sans absolute tracking-tighter text-xs -top-0 border-0 border-gray-300 rounded-md p-2 left-1 text-blue-950/60"
            >
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className={inputClassName}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="email"
              className="block font-light font-sans absolute tracking-tighter text-xs -top-0 border-0 border-gray-300 rounded-md p-2 left-1 text-blue-950/60"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClassName}
            />
          </div>
        </div>

        <div className="h-16 flex items-center justify-end px-2.5">
          <button
            type="submit"
            disabled={loading}
            className="w-fit px-4 h-9 text-[16px] font-semibold font-sans tracking-tighter border rounded-2xl border-transparent text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputClassName =
  "ps-3 font-sans tracking-tight text-lg block pt-5 h-16 w-full rounded-2xl bg-white border-gray-300 border focus:border-blue-500 focus:ring-blue-500 text-[#14141b]";
