import React from "react";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      icon: DollarSign,
    },
    {
      title: "Active Orders",
      value: "+2,350",
      change: "+180.1% from last month",
      icon: ShoppingBag,
    },
    {
      title: "Products Listed",
      value: "348",
      change: "12 added this week",
      icon: Package,
    },
    {
      title: "Active Users",
      value: "+12,234",
      change: "+19% from last month",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Welcome back! Here is what is happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">
                  {stat.value}
                </p>
                <p className="text-xs text-emerald-600 font-medium mt-1">
                  {stat.change}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
