/* eslint-disable react/no-unescaped-entities */

import DashboardHeader from "./_components/Dashboard/DashboardHeader";
import LowStockItems from "./_components/Dashboard/LowStockItems";
import StatsCards from "./_components/Dashboard/StatsCards";

import RecentOrders from "./_components/Dashboard/RecentOrders";

export default function page() {
  return (
    <main className="flex-1 p-6">
      {/* Dashboard Page */}
      <div className="page-content">
        <DashboardHeader title="Dashboard">
          Welcome back! Here's what's happening with your T-shirt store.
        </DashboardHeader>
        {/* Stats Cards */}
        <StatsCards />
        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <LowStockItems />
        </div>
        {/* Charts Section */}
        <div className="mb-8">
          <RecentOrders />
        </div>
      </div>
    </main>
  );
}
