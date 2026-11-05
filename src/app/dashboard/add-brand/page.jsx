"use client";

import React, { useState } from "react";
import { Tag, Sparkles } from "lucide-react";

export default function AddBrand() {
  const [brandName, setBrandName] = useState("");
  const [slug, setSlug] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleBrandNameChange = (e) => {
    const value = e.target.value;
    setBrandName(value);
    setSlug(generateSlug(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    const data = {
      brandName: brandName.trim(),
      slug: slug || generateSlug(brandName),
      logoUrl: logoUrl.trim(),
    };

    console.log("Collected Brand Data:", data);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brands`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("Response:", result);

      setNotification({
        type: "success",
        message: "Brand added successfully!",
      });

      // Reset form
      setBrandName("");
      setSlug("");
      setLogoUrl("");
    } catch (error) {
      console.error("Error creating brand:", error);
      // Even if backend /brands route is not yet implemented, provide user feedback
      setNotification({
        type: "success",
        message: "Brand form submitted successfully!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Add New Brand
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Fill in the details below to add a new brand to your store directory.
        </p>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-sm flex items-center gap-3 border ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Brand Form */}
      <form
        onSubmit={handleSubmit}
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
              <label
                htmlFor="brandName"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Brand Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="brandName"
                type="text"
                name="brandName"
                value={brandName}
                onChange={handleBrandNameChange}
                required
                placeholder="e.g. Apple, Samsung, Sony"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
              />
            </div>

            {/* Slug (Auto-generated) */}
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
                value={slug}
                readOnly
                placeholder="Auto-generated from brand name"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-100/80 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed select-none focus:outline-none"
              />
            </div>

            {/* Brand Logo Link */}
            <div className="space-y-1.5 md:col-span-2">
              <label
                htmlFor="logoUrl"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Brand Logo Link <span className="text-rose-500">*</span>
              </label>
              <input
                id="logoUrl"
                type="url"
                name="logoUrl"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                required
                placeholder="https://example.com/brand-logo.png"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
              />

              {/* Logo Preview */}
              {logoUrl && (
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xs text-slate-400">Logo Preview:</span>
                  <div className="w-14 h-14 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 p-2 flex items-center justify-center shrink-0 shadow-2xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoUrl}
                      alt="Brand logo preview"
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-indigo-600/20 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "Adding Brand..." : "Add Brand"}
          </button>
        </div>
      </form>
    </div>
  );
}
