"use client";

import { MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function MoneyFlowChart() {
  // Chart data
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const incomeData = [
    30000, 40000, 45000, 35000, 30000, 40000, 35000, 40000, 35000, 45000, 40000,
    30000,
  ];
  const outcomeData = [
    25000, 35000, 15000, 20000, 15000, 30000, 25000, 15000, 20000, 25000, 35000,
    30000,
  ];

  const maxValue = 50000;

  return (
    <Card className="bg-gradient-to-br from-[#1e293b] to-[#111827] border-none shadow-lg overflow-hidden relative">
      {/* Add subtle orange glow effect */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl opacity-30"></div>

      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-medium">Money Flow</CardTitle>
        <button className="text-gray-400 hover:text-white">
          <MoreVertical size={20} />
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span className="text-sm text-gray-400">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
            <span className="text-sm text-gray-400">Outcome</span>
          </div>
        </div>

        <div className="relative h-64">
          <div className="absolute left-0 top-0 text-xs text-gray-400">50k</div>
          <div className="absolute left-0 top-1/4 text-xs text-gray-400">
            40k
          </div>
          <div className="absolute left-0 top-2/4 text-xs text-gray-400">
            30k
          </div>
          <div className="absolute left-0 top-3/4 text-xs text-gray-400">
            20k
          </div>
          <div className="absolute left-0 bottom-0 text-xs text-gray-400">
            10k
          </div>
          <div className="absolute left-0 bottom-0 translate-y-6 text-xs text-gray-400">
            0
          </div>

          <div className="ml-8 h-full flex items-end">
            <div className="flex-1 flex justify-around items-end h-full">
              {months.map((month, index) => (
                <div
                  key={month}
                  className="flex flex-col items-center gap-1 w-full"
                >
                  <div className="flex gap-1">
                    <div
                      className="w-3 bg-blue-400 rounded-t-sm"
                      style={{
                        height: `${(incomeData[index] / maxValue) * 100}%`,
                      }}
                    ></div>
                    <div
                      className="w-3 bg-orange-400 rounded-t-sm"
                      style={{
                        height: `${(outcomeData[index] / maxValue) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">{month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
