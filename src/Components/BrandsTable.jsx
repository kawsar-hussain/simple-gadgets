import React from "react";
import Link from "next/link";
import { Plus, Tag, ExternalLink } from "lucide-react";

export default async function BrandsTable() {
  let brands = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brands`, {
      cache: "no-store",
    });
    if (res.ok) {
      brands = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch brands:", error);
  }

  const brandList = Array.isArray(brands) ? brands : [];

  return (
    <div className="w-full space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              All Brands
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
              {brandList.length} {brandList.length === 1 ? "brand" : "brands"}
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-1">
            Overview of all gadget brands registered in your store
          </p>
        </div>

        <Link
          href="/dashboard/add-brand"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Brand</span>
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4 font-semibold text-center w-16">
                  Logo
                </th>
                <th className="py-3.5 px-4 font-semibold">Brand Name</th>
                <th className="py-3.5 px-4 font-semibold">Slug</th>
                <th className="py-3.5 px-4 font-semibold">Logo URL</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 text-sm">
              {brandList.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-12 text-center text-sm text-slate-400"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Tag className="w-8 h-8 text-slate-300" />
                      <p>No brands found</p>
                      <Link
                        href="/dashboard/add-brand"
                        className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Add your first brand &rarr;
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                brandList.map((brand) => (
                  <tr
                    key={brand._id || brand.slug}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-center">
                      <div className="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 p-1 flex items-center justify-center mx-auto overflow-hidden shrink-0 shadow-2xs">
                        {brand.logoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={brand.logoUrl}
                            alt={brand.brandName || "Brand Logo"}
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <Tag className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {brand.brandName || "—"}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200/60">
                        {brand.slug || "—"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {brand.logoUrl ? (
                        <a
                          href={brand.logoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 hover:underline max-w-[260px] truncate"
                          title={brand.logoUrl}
                        >
                          <span className="truncate">{brand.logoUrl}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            Showing {brandList.length > 0 ? 1 : 0} to {brandList.length} of{" "}
            {brandList.length} entries
          </span>
          <span className="text-slate-400">
            Total {brandList.length} registered{" "}
            {brandList.length === 1 ? "brand" : "brands"}
          </span>
        </div>
      </div>
    </div>
  );
}
