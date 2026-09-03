"use client";

import React, { useState } from "react";
import DashboardSidebar from "@/Components/DashboardSidebar";
import { Bell, Menu, User } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-100/75">
      {/* Sidebar Component */}
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Dashboard Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Dashboard Header */}
        <header className="h-16 md:h-20 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 md:hidden cursor-pointer"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Dashboard
              </h2>
              <span className="text-xs text-slate-500 hidden sm:inline-block">
                Manage your gadget catalog and sales
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition relative cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-700 hidden sm:inline-block">
                Admin
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
