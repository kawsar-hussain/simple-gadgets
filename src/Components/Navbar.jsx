"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  Zap,
  Search,
  Heart,
  Settings,
  Package,
  LogOut,
  ChevronDown,
  MenuSquare,
  LayoutDashboard,
} from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const pathname = usePathname();

  const profileRef = useRef(null);
  const cartRef = useRef(null);

  // Close dropdowns and menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartPreviewOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "Deals", href: "/deals", badge: "HOT" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* ================= LEFT: LOGO ================= */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <Zap className="w-5 h-5 fill-white/20" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                  Gadget<span className="text-indigo-600">Pulse</span>
                </span>
                <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase mt-0.5">
                  Tech & Gadgets
                </span>
              </div>
            </Link>
          </div>

          {/* ================= MIDDLE: DESKTOP NAV LINKS ================= */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? "text-indigo-600 bg-indigo-50/80 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold tracking-wide rounded-full bg-rose-500 text-white shadow-xs animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ================= RIGHT: ACTIONS (SEARCH, CART, PROFILE, MOBILE TOGGLE) ================= */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger (Desktop) */}
            <button
              type="button"
              aria-label="Search"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-slate-100 hover:bg-slate-200/80 hover:text-slate-600 rounded-full border border-slate-200/70 transition cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Search gadgets...</span>
              <kbd className="text-[10px] bg-white text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Cart Button & Dropdown */}
            <div className="relative" ref={cartRef}>
              <button
                type="button"
                onClick={() => setIsCartPreviewOpen(!isCartPreviewOpen)}
                aria-label="Shopping Cart"
                className="relative p-2.5 rounded-full text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-indigo-600 rounded-full ring-2 ring-white animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Cart Quick Preview Dropdown */}
              {isCartPreviewOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-4 px-4 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="font-semibold text-slate-900 text-sm">
                      Shopping Bag ({cartCount})
                    </span>
                    <Link
                      href="/cart"
                      onClick={() => setIsCartPreviewOpen(false)}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="py-3 space-y-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-medium">
                        🎧
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800 truncate">
                          Wireless Noise-Canceling ANC Pro
                        </p>
                        <p className="text-[11px] text-slate-500">
                          1 × $199.00
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-medium">
                        ⚡
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800 truncate">
                          MagSafe Ultra Fast Charger 65W
                        </p>
                        <p className="text-[11px] text-slate-500">1 × $49.00</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
                      <span>Subtotal</span>
                      <span>$248.00</span>
                    </div>
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartPreviewOpen(false)}
                      className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-xl text-center shadow-xs transition"
                    >
                      Checkout Now
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="User profile"
                aria-expanded={isProfileOpen}
                className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-full text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition cursor-pointer border border-transparent hover:border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                  <User className="w-4 h-4" />
                </div>
                <ChevronDown
                  className={`hidden sm:block w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">
                      Alex Morgan
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      alex.morgan@gadgetpulse.com
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      Dashboard
                    </Link>
                    <Link
                      href="/account"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      My Profile
                    </Link>
                    <Link
                      href="/orders"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition"
                    >
                      <Package className="w-4 h-4 text-slate-400" />
                      Orders & Tracking
                    </Link>
                    <Link
                      href="/wishlist"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition"
                    >
                      <Heart className="w-4 h-4 text-slate-400" />
                      Wishlist
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      Settings
                    </Link>
                  </div>

                  <div className="pt-1 mt-1 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        alert("Signed out successfully!");
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE NAVIGATION DRAWER & BACKDROP ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 md:hidden z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200">
          <div className="bg-white border-b border-slate-200 shadow-2xl px-6 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top-4 duration-200">
            {/* Mobile Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search gadgets, electronics, brands..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-1 pb-6 border-b border-slate-100">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 px-2">
                Navigation
              </p>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600 font-semibold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile User Quick Links */}
            <div className="pt-5 pb-4 space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 px-2">
                Account & Orders
              </p>
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition"
              >
                <User className="w-4 h-4 text-slate-400" />
                Profile & Settings
              </Link>
              <Link
                href="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition"
              >
                <Package className="w-4 h-4 text-slate-400" />
                My Orders
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-slate-400" />
                  Shopping Cart
                </div>
                <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full">
                  {cartCount} items
                </span>
              </Link>
            </div>

            {/* Mobile Quick Checkout Button */}
            <div className="pt-2">
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition"
              >
                <ShoppingBag className="w-4 h-4" />
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
