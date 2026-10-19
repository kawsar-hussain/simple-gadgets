/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import ProductRowActions from "./ProductRowActions";
import { Package, Plus } from "lucide-react";

export default async function ProductsTable() {
  return (
    <div className="w-full space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              All Products
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
              3 items
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Overview of all gadgets and items currently in your inventory
          </p>
        </div>

        <Link
          href="/dashboard/add-product"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4 font-semibold w-12 text-center">
                  #
                </th>
                <th className="py-3.5 px-4 font-semibold">Product</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Brand</th>
                <th className="py-3.5 px-4 font-semibold">Price</th>
                <th className="py-3.5 px-4 font-semibold">Specifications</th>
                <th className="py-3.5 px-4 font-semibold">Color</th>
                <th className="py-3.5 px-4 font-semibold">Stock</th>
                <th className="py-3.5 px-4 font-semibold text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4 font-medium text-slate-400 text-xs text-center">
                  1
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200/80 overflow-hidden shrink-0 flex items-center justify-center">
                      <img
                        src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf"
                        alt="Samsung Galaxy S25 Ultra"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <div
                        className="font-semibold text-slate-900 text-sm truncate max-w-[220px]"
                        title="Samsung Galaxy S25 Ultra"
                      >
                        Samsung Galaxy S25 Ultra
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono truncate max-w-[180px]">
                        samsung-galaxy-s25-ultra
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                    Mobile
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-medium text-slate-700 text-sm">
                    Samsung
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-semibold text-slate-900 text-sm">
                    $1,199.99
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-col gap-1 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                        RAM
                      </span>
                      <span className="font-medium">12GB</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600">
                        ROM
                      </span>
                      <span className="font-medium">256GB</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100/80 text-slate-700 border border-slate-200/60">
                    <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
                    <span className="truncate max-w-[120px]">
                      Titanium Gray
                    </span>
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-xs font-semibold text-slate-700">
                    45 <span className="font-normal text-slate-500">pcs</span>
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <ProductRowActions
                    productId="1"
                    productName="Samsung Galaxy S25 Ultra"
                  />
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4 font-medium text-slate-400 text-xs text-center">
                  2
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200/80 overflow-hidden shrink-0 flex items-center justify-center">
                      <img
                        src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
                        alt="MacBook Pro 16 M4"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <div
                        className="font-semibold text-slate-900 text-sm truncate max-w-[220px]"
                        title="MacBook Pro 16 M4"
                      >
                        MacBook Pro 16 M4
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono truncate max-w-[180px]">
                        macbook-pro-16-m4
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                    Laptop
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-medium text-slate-700 text-sm">
                    Apple
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-semibold text-slate-900 text-sm">
                    $2,499.00
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-col gap-1 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                        RAM
                      </span>
                      <span className="font-medium">24GB</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600">
                        ROM
                      </span>
                      <span className="font-medium">512GB</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100/80 text-slate-700 border border-slate-200/60">
                    <span className="w-2 h-2 rounded-full bg-slate-900 shrink-0" />
                    <span className="truncate max-w-[120px]">Space Black</span>
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    In Stock
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <ProductRowActions
                    productId="2"
                    productName="MacBook Pro 16 M4"
                  />
                </td>
              </tr>

              {/* Row 3 (Fallback thumbnail & specifications) */}
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4 font-medium text-slate-400 text-xs text-center">
                  3
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200/80 overflow-hidden shrink-0 flex items-center justify-center">
                      <Package className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="min-w-0">
                      <div
                        className="font-semibold text-slate-900 text-sm truncate max-w-[220px]"
                        title="Sony WH-1000XM5"
                      >
                        Sony WH-1000XM5
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono truncate max-w-[180px]">
                        #f891b2
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                    Audio
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-medium text-slate-700 text-sm">
                    Sony
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-semibold text-slate-900 text-sm">
                    $399.99
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-slate-400 text-xs">—</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-slate-400 text-xs">—</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-xs font-semibold text-slate-700">
                    12 <span className="font-normal text-slate-500">pcs</span>
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <ProductRowActions
                    productId="3"
                    productName="Sony WH-1000XM5"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            Showing <span className="font-medium text-slate-700">1</span> to{" "}
            <span className="font-medium text-slate-700">3</span> of{" "}
            <span className="font-medium text-slate-700">3</span> entries
          </span>
          <span className="text-slate-400">Total 3 registered gadgets</span>
        </div>
      </div>
    </div>
  );
}
