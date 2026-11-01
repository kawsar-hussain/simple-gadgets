"use client";

import React from "react";
import Link from "next/link";
import { Save } from "lucide-react";

export default function EditProductForm({ initialProduct }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Edit Product
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Modify the specifications and details of this gadget below.
        </p>
      </div>

      <form className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
        {/* Basic Information */}
        <div>
          <h2 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label
                htmlFor="productName"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                name="productName"
                defaultValue={initialProduct?.productName || ""}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="slug"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Slug
              </label>
              <input
                id="slug"
                type="text"
                name="slug"
                defaultValue={initialProduct?.slug || ""}
                readOnly
                className="w-full px-3.5 py-2.5 text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-500"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="brand"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Brand
              </label>
              <input
                id="brand"
                type="text"
                name="brand"
                defaultValue={initialProduct?.brand || ""}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="category"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue={initialProduct?.category || "Mobile"}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Mobile">Mobile</option>
                <option value="Tablet">Tablet</option>
                <option value="Laptop">Laptop</option>
                <option value="Audio">Audio</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>
        </div>

        {/* Media & Pricing */}
        <div>
          <h2 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Media & Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5 md:col-span-2">
              <label
                htmlFor="imageUrl"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Product Image URL
              </label>
              <input
                id="imageUrl"
                type="text"
                name="imageUrl"
                defaultValue={initialProduct?.imageUrl || ""}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="price"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Price ($)
              </label>
              <input
                id="price"
                type="number"
                name="price"
                defaultValue={initialProduct?.price ?? ""}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="color"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Color
              </label>
              <input
                id="color"
                type="text"
                name="color"
                defaultValue={initialProduct?.color || ""}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div>
          <h2 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Technical Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label
                htmlFor="ram"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                RAM
              </label>
              <input
                id="ram"
                type="text"
                name="ram"
                defaultValue={initialProduct?.ram || ""}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="internalStorage"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Internal Storage
              </label>
              <input
                id="internalStorage"
                type="text"
                name="internalStorage"
                defaultValue={initialProduct?.internalStorage || ""}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <Link
            href="/dashboard/products"
            className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </Link>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl"
          >
            <Save className="w-4 h-4" />
            <span>Update Product</span>
          </button>
        </div>
      </form>
    </div>
  );
}
