"use client";

import React from "react";

export default function AddProductForm() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Auto-generate slug from product name if not present via disabled input
    if (!data.slug && data.productName) {
      data.slug = data.productName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    console.log("Collected Form Data:", data);

    // send data to the backend

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Add New Product
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Fill in the details below to add a new gadget to your inventory.
        </p>
      </div>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8"
      >
        {/* Section 1: Basic Information */}
        <div>
          <h2 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Product Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="productName"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Product Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="productName"
                type="text"
                name="productName"
                required
                placeholder="e.g. Samsung Galaxy S25 Ultra"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label
                htmlFor="slug"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Slug (Auto-generated)
              </label>
              <input
                id="slug"
                type="text"
                name="slug"
                readOnly
                placeholder="Auto-generated on submit"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-100/80 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed select-none focus:outline-none"
              />
            </div>

            {/* Brand */}
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
                placeholder="e.g. Samsung, Apple, Sony"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
              />
            </div>

            {/* Category */}
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
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition cursor-pointer"
              >
                <option value="Mobile">Mobile</option>
                <option value="Tablet">Tablet</option>
                <option value="Laptop">Laptop</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Media & Pricing */}
        <div>
          <h2 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Media & Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Product Image URL */}
            <div className="space-y-1.5 md:col-span-2">
              <label
                htmlFor="imageUrl"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Product Image URL <span className="text-rose-500">*</span>
              </label>
              <input
                id="imageUrl"
                type="url"
                name="imageUrl"
                required
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
              />
            </div>

            {/* Price */}
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
                min="0"
                step="any"
                placeholder="e.g. 1199.99"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
              />
            </div>

            {/* Color */}
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
                placeholder="e.g. Titanium Gray, Midnight Black"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Technical Specifications */}
        <div>
          <h2 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Technical Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* RAM */}
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
                placeholder="e.g. 8GB, 12GB, 16GB"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
              />
            </div>

            {/* Internal Storage */}
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
                placeholder="e.g. 128GB, 256GB, 512GB, 1TB"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-indigo-600/20 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
