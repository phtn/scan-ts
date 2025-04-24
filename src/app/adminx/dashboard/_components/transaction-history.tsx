import { Calendar, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";

export default function TransactionHistory() {
  const transactions = [
    {
      id: 1,
      name: "Spotify",
      amount: "-$18.99",
      date: "Wed 1:00pm",
      category: "Subscriptions",
      categoryColor: "blue",
      icon: "S",
      iconBg: "bg-green-500",
    },
    {
      id: 2,
      name: "Stripe",
      amount: "+$120.00",
      date: "Wed 10:45am",
      category: "Income",
      categoryColor: "green",
      icon: "S",
      iconBg: "bg-indigo-500",
    },
    {
      id: 3,
      name: "A Coffee",
      amount: "-$4.50",
      date: "Wed 3:20am",
      category: "Food and dining",
      categoryColor: "purple",
      icon: "AC",
      iconBg: "bg-gray-700",
    },
    {
      id: 4,
      name: "Stripe",
      amount: "+$88.00",
      date: "Wed 2:45am",
      category: "Income",
      categoryColor: "green",
      icon: "S",
      iconBg: "bg-indigo-500",
    },
    {
      id: 5,
      name: "Figma",
      amount: "-$15.00",
      date: "Tue 8:10pm",
      category: "Subscriptions",
      categoryColor: "blue",
      icon: "F",
      iconBg: "bg-black",
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-[#1e293b] to-[#111827] border-none shadow-lg overflow-hidden h-full relative">
      {/* Add subtle orange glow effect */}
      <div className="absolute -bottom-20 left-20 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl opacity-30"></div>

      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-medium">
          Transaction history
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-[#2d3748] border-none text-gray-300 hover:bg-[#374151] flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            <span>Select dates</span>
          </Button>
          <Button
            variant="outline"
            className="bg-[#2d3748] border-none text-gray-300 hover:bg-[#374151] flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            <span>Apply filter</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <div className="grid grid-cols-4 text-sm text-gray-400 pb-2 border-b border-gray-700">
            <div>Transaction</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Date</div>
            <div className="text-right">Category</div>
          </div>

          <div className="space-y-4 mt-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid grid-cols-4 items-center text-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 ${transaction.iconBg} rounded-full flex items-center justify-center text-white font-medium`}
                  >
                    {transaction.icon}
                  </div>
                  <span>{transaction.name}</span>
                </div>
                <div
                  className={`text-right ${transaction.amount.startsWith("+") ? "text-green-500" : "text-gray-300"}`}
                >
                  {transaction.amount}
                </div>
                <div className="text-right text-gray-400">
                  {transaction.date}
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                      transaction.categoryColor === "blue"
                        ? "bg-blue-900/60 text-blue-300"
                        : transaction.categoryColor === "green"
                          ? "bg-green-900/60 text-green-300"
                          : "bg-purple-900/60 text-purple-300"
                    }`}
                  >
                    <span
                      className={`mr-1.5 w-1.5 h-1.5 rounded-full ${
                        transaction.categoryColor === "blue"
                          ? "bg-blue-400"
                          : transaction.categoryColor === "green"
                            ? "bg-green-400"
                            : "bg-purple-400"
                      }`}
                    ></span>
                    {transaction.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
