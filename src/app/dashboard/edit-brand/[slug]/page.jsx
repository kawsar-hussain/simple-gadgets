import React from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import EditBrandForm from "@/Components/EditBrandForm";

export const dynamic = "force-dynamic";

async function getBrand(slug) {
  try {
    // 1. Direct fetch by slug/id
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/brands/${slug}`,
      {
        cache: "no-store",
      },
    );
    if (res.ok) {
      const data = await res.json();
      const brand = Array.isArray(data) ? data[0] : data;
      if (brand && (brand.brandName || brand.slug)) {
        return brand;
      }
    }

    // 2. Fallback: fetch all brands and search by slug or _id
    const allRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brands`, {
      cache: "no-store",
    });
    if (allRes.ok) {
      const allData = await allRes.json();
      if (Array.isArray(allData)) {
        const match = allData.find(
          (b) => b.slug === slug || b._id?.toString() === slug,
        );
        if (match) {
          return match;
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error fetching brand for edit:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `Edit Brand - ${slug} | GadgetPulse`,
  };
}

export default async function EditBrandPage({ params }) {
  const { slug } = await params;
  const brand = await getBrand(slug);

  if (!brand) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Brand Not Found</h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            We couldn&apos;t find any brand matching &quot;{slug}&quot;. It might
            have been deleted or the link is incorrect.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/brands"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Brands</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/dashboard/brands"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Brands</span>
      </Link>

      <EditBrandForm initialBrand={brand} />
    </div>
  );
}
