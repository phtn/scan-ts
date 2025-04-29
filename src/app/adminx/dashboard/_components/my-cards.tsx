import { ArrowRight, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";

export default function MyCards() {
  return (
    <Card className="bg-gradient-to-br rounded-md from-hot-dark/60 to-hot-dark/30 border-none shadow-lg overflow-hidden relative">
      {/* Add subtle orange glow effect */}
      <div className="absolute -top-20 -left-10 size-80 bg-orange-100/20 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute -bottom-32 -right-32 size-96 bg-cyan-100/20 rounded-full blur-[80px] opacity-40"></div>

      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-medium">My Cards</CardTitle>
        <div className="flex items-center text-sm">
          <span className="text-gray-300">Show All</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2 px-2">
          <div className="bg-gradient-to-br border-e border-t-[0.25px] border-blue-300/40 from-hot-dark via-hot-dark/40 to-panel-dark rounded-xl p-5 shadow-lg relative overflow-hidden">
            {/* Card background effects */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute top-10 left-20 w-20 h-20 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>

            <div className="flex justify-between items-start mb-16">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded"></div>
                <span className="text-lg font-bold">Fundly</span>
              </div>
              <div className="text-sm text-gray-300">...3656</div>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-gray-400">Total Balance</div>
              <div className="text-2xl font-bold">86 320.25 USD</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button className="bg-black p-0 h-full overflow-hidden">
              <div className="bg-gradient-to-r flex size-full from-panel-dark/20 to-hot-dark/20 hover:from-[#374151] hover:to-[#4b5563] text-white border-none items-center justify-center gap-2">
                <Send className="h-5 w-5" />
                <span>Send</span>
              </div>
            </Button>
            <Button className="bg-gradient-to-r from-[#2d3748] to-[#374151] hover:from-[#374151] hover:to-[#4b5563] text-white border-none flex items-center justify-center gap-2 py-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-credit-card"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
              <span>Request</span>
            </Button>
          </div>
        </div>
      </CardContent>

      <div className="absolute -bottom-32 -right-20 size-96 bg-blue-300/20 rounded-full blur-2xl opacity-80"></div>
    </Card>
  );
}
