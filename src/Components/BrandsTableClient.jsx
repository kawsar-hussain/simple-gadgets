"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Tag, ExternalLink, Trash2 } from "lucide-react";
import BrandRowActions from "./BrandRowActions";
import { useRouter } from "next/navigation";

export default function BrandsTableClient({ initialBrands = [] }) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState([]);

  // Handle single row checkbox toggle
  const handleToggleSelect = (brandId) => {
    setSelectedIds((prev) => {
      const updated = prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId];
      console.log("Collected Brand IDs for multiple delete:", updated);
      return updated;
    });
  };

  // Handle select all toggle
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = initialBrands.map((b) => b._id?.toString() || b._id);
      setSelectedIds(allIds);
      console.log("Collected all Brand IDs for multiple delete:", allIds);
    } else {
      setSelectedIds([]);
      console.log("Selection cleared, 0 IDs collected");
    }
  };

  // Clear all selections
  const handleClearSelection = () => {
    setSelectedIds([]);
    console.log("Selection cleared, 0 IDs collected");
  };

  // Trigger when top delete button is clicked
  const handleMultipleDelete = () => {
    // DO NOT add delete API call per instructions: "dont added its deleted code, just collect all id of multiple delete"
    console.log(
      "Top Delete Clicked! Collected Brand IDs for multiple delete:",
      selectedIds,
    );
    alert(
      `Collected ${selectedIds.length} Brand IDs for multiple delete:\n\n${selectedIds.join(
        "\n",
      )}`,
    );

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brands/bulk`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: selectedIds }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          console.log(data);
          router.refresh();
        }
      });
  };

  const isAllSelected =
    initialBrands.length > 0 && selectedIds.length === initialBrands.length;
  const isIndeterminate =
    selectedIds.length > 0 && selectedIds.length < initialBrands.length;

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
              {initialBrands.length}{" "}
              {initialBrands.length === 1 ? "brand" : "brands"}
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

      {/* Multiple Selector Action Bar (Opens at top when at least 1 item is selected) */}
      {selectedIds.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-indigo-50/90 border border-indigo-200/90 p-4 rounded-2xl shadow-xs animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs shadow-xs">
              {selectedIds.length}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900">
                  {selectedIds.length}{" "}
                  {selectedIds.length === 1 ? "brand" : "brands"} selected
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-indigo-100 text-indigo-700">
                  Multiple selector active
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5 truncate max-w-md">
                Collected IDs: [{selectedIds.join(", ")}]
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={handleClearSelection}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white rounded-xl border border-slate-200/80 transition cursor-pointer shadow-2xs"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleMultipleDelete}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer"
              title="Delete Selected Brands"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete ({selectedIds.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] uppercase tracking-wider text-slate-500">
                {/* Select All Checkbox Header */}
                <th className="py-3.5 px-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={handleSelectAll}
                    aria-label="Select all brands"
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600 transition"
                  />
                </th>
                <th className="py-3.5 px-4 font-semibold text-center w-16">
                  Logo
                </th>
                <th className="py-3.5 px-4 font-semibold">Brand Name</th>
                <th className="py-3.5 px-4 font-semibold">Slug</th>
                <th className="py-3.5 px-4 font-semibold">Logo URL</th>
                <th className="py-3.5 px-4 font-semibold text-center w-28">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 text-sm">
              {initialBrands.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
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
                initialBrands.map((brand) => {
                  const brandId = brand._id?.toString() || brand._id;
                  const isSelected = selectedIds.includes(brandId);

                  return (
                    <tr
                      key={brandId || brand.slug}
                      className={`transition-colors ${
                        isSelected
                          ? "bg-indigo-50/50 hover:bg-indigo-50/70"
                          : "hover:bg-slate-50/70"
                      }`}
                    >
                      {/* Row Selector Checkbox */}
                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(brandId)}
                          aria-label={`Select ${brand.brandName || "brand"}`}
                          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600 transition"
                        />
                      </td>

                      {/* Logo */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 p-1 flex items-center justify-center mx-auto overflow-hidden shrink-0 shadow-2xs">
                          {brand.logoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={brand.logoUrl}
                              alt={brand.brandName || "Brand Logo"}
                              className="max-w-full max-h-full object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <Tag className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </td>

                      {/* Brand Name */}
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {brand.brandName || "—"}
                      </td>

                      {/* Slug */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200/60">
                          {brand.slug || "—"}
                        </span>
                      </td>

                      {/* Logo URL */}
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

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-center">
                        <BrandRowActions id={brandId} slug={brand.slug} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>
              Showing {initialBrands.length > 0 ? 1 : 0} to{" "}
              {initialBrands.length} of {initialBrands.length} entries
            </span>
            {selectedIds.length > 0 && (
              <span className="text-indigo-600 font-semibold">
                ({selectedIds.length} selected)
              </span>
            )}
          </div>
          <span className="text-slate-400">
            Total {initialBrands.length} registered{" "}
            {initialBrands.length === 1 ? "brand" : "brands"}
          </span>
        </div>
      </div>
    </div>
  );
}
