"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  ArrowLeft,
  Zap,
  X,
  SquarePlus,
  Tag,
  Tags,
} from "lucide-react";

export default function DashboardSidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },

    { name: "Add Product", href: "/dashboard/add-product", icon: SquarePlus },
    { name: "Add Brand", href: "/dashboard/add-brand", icon: Tag },
    { name: "Brands", href: "/dashboard/brands", icon: Tags },
    { name: "Products", href: "/dashboard/products", icon: Package },
  ];

  return (
    <>
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-16 md:h-20 px-6 flex items-center justify-between border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Zap className="w-4 h-4 fill-white/20" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 leading-none">
                Gadget<span className="text-indigo-600">Pulse</span>
              </span>
              <span className="text-[9px] font-semibold tracking-wider text-indigo-600 uppercase mt-0.5">
                Admin Portal
              </span>
            </div>
          </Link>
          <button
            type="button"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 md:hidden cursor-pointer"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Nav Links */}
        <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Management
          </p>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 font-semibold shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-indigo-600" : "text-slate-400"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer Link (Back to Store) */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <span>Back to Store</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
