"use client";

import { MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function ExpensesBreakdown() {
  return (
    <Card className="bg-gradient-to-br from-[#1e293b] to-[#111827] border-none shadow-lg overflow-hidden h-full relative">
      {/* Add subtle orange glow effect */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl opacity-30"></div>

      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-medium">
          Expenses Breakdown
        </CardTitle>
        <button className="text-gray-400 hover:text-white">
          <MoreVertical size={20} />
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-400">Jan 1 - Jan 31, 2025</div>
            <div className="text-3xl font-bold mt-1">$ 64,900</div>
            <div className="text-sm text-gray-400 mt-1">
              Compared to $48,900 last month
            </div>
          </div>

          <div className="h-40 relative">
            {/* This would be a real chart in a production app */}
            <svg viewBox="0 0 300 100" className="w-full h-full">
              {/* Orange line - Bills */}
              <path
                d="M0,50 C20,40 40,20 60,30 C80,40 100,60 120,50 C140,40 160,20 180,30 C200,40 220,60 240,50 C260,40 280,30 300,40"
                fill="none"
                stroke="#f97316"
                strokeWidth="2.5"
              />

              {/* Blue line - Subscriptions */}
              <path
                d="M0,60 C20,50 40,40 60,50 C80,60 100,70 120,60 C140,50 160,40 180,50 C200,60 220,70 240,60 C260,50 280,40 300,50"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
              />

              {/* Purple line - Food and dining */}
              <path
                d="M0,70 C20,60 40,50 60,60 C80,70 100,80 120,70 C140,60 160,50 180,60 C200,70 220,80 240,70 C260,60 280,50 300,60"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-gray-300">Bills</span>
              </div>
              <span className="font-medium">$34,600</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-300">Subscriptions</span>
              </div>
              <span className="font-medium">$18,300</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-gray-300">Food and dining</span>
              </div>
              <span className="font-medium">$12,000</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
