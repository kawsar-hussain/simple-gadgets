import React from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import EditProductForm from "@/Components/EditProductForm";

export const dynamic = "force-dynamic";

async function getProduct(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/${slug}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error("Error fetching product for edit:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `Edit Product - ${slug} | GadgetPulse`,
  };
}

export default async function EditProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Product Not Found
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            We couldn&apos;t find any product matching the slug &quot;{slug}&quot;.
            It might have been removed or the link is incorrect.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/products"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
      <Link
        href="/dashboard/products"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </Link>

      <EditProductForm initialProduct={product} />
    </div>
  );
}
