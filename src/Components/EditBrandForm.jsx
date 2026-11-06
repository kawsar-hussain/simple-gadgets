"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag, Save } from "lucide-react";

export default function EditBrandForm({ initialBrand }) {
  const [brandName, setBrandName] = useState(initialBrand?.brandName || "");

  const [slug, setSlug] = useState(initialBrand?.slug || "");

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const handleBrandName = (e) => {
    const value = e.target.value;

    setBrandName(value);
    setSlug(generateSlug(value));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());

    console.log(updatedData);

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brands/${initialBrand._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Edit Brand
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Update the brand profile and logo assets.
        </p>
      </div>

      <form
        onSubmit={handleUpdate}
        className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8"
      >
        <div>
          <h2 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Tag className="w-4 h-4 text-indigo-600" />
            <span>Brand Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Brand Name */}
            <div className="space-y-1.5">
              <label htmlFor="brandName">Brand Name</label>
              <input
                id="brandName"
                type="text"
                name="brandName"
                value={brandName}
                onChange={handleBrandName}
                required
                placeholder="e.g. Apple, Samsung, Sony"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label htmlFor="slug">Slug</label>
              <input
                id="slug"
                type="text"
                name="slug"
                value={slug}
                readOnly
                className="w-full px-3.5 py-2.5 text-sm bg-slate-100 border border-slate-200 rounded-xl"
              />
            </div>

            {/* Brand Logo Link */}
            <div className="space-y-1.5 md:col-span-2">
              <label htmlFor="logoUrl">Brand Logo Link</label>
              <input
                id="logoUrl"
                type="url"
                name="logoUrl"
                defaultValue={initialBrand?.logoUrl || ""}
                required
                placeholder="https://example.com/brand-logo.png"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <Link href="/dashboard/brands">Cancel</Link>

          <button
            type="submit"
            className="bg-sky-400 p-2 px-4 rounded-xl text-white cursor-pointer active:scale-95 duration-75"
          >
            <Save className="w-4 h-4 inline mr-2" />
            Update Brand
          </button>
        </div>
      </form>
    </div>
  );
}
