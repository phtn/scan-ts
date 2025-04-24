import Sidebar from "./_components/sidebar";
import SearchBar from "./_components/search-bar";
import ThemeToggle from "./_components/theme-toggle";
import NotificationBell from "./_components/notification-bell";
import MoneyFlowChart from "./_components/money-flow-chart";
import MyCards from "./_components/my-cards";
import TransactionHistory from "./_components/transaction-history";
import ExpensesBreakdown from "./_components/expenses-breakdown";
import UserProfile from "./_components/user-profile";

export const Content = () => {
  return (
    <div className="flex h-screen bg-hot-dark text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4">
          <SearchBar />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <NotificationBell />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-7">
              <MoneyFlowChart />
            </div>
            <div className="col-span-12 lg:col-span-5">
              <MyCards />
            </div>
            <div className="col-span-12 lg:col-span-7">
              <TransactionHistory />
            </div>
            <div className="col-span-12 lg:col-span-5">
              <ExpensesBreakdown />
            </div>
          </div>
        </main>
        <UserProfile />
      </div>
    </div>
  );
};
