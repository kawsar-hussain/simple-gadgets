import Link from "next/link";
import { Plus } from "lucide-react";
import ProductRowActions from "./ProductRowActions";

export default async function ProductsTable() {
  let products = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, {
      cache: "no-store",
    });
    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  const productList = Array.isArray(products) ? products : [];

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
              {productList.length} {productList.length === 1 ? "item" : "items"}
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
                <th className="py-3.5 px-4 font-semibold">Product Name</th>
                <th className="py-3.5 px-4 font-semibold">Brand</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Price</th>
                <th className="py-3.5 px-4 font-semibold">Color</th>
                <th className="py-3.5 px-4 font-semibold">RAM</th>
                <th className="py-3.5 px-4 font-semibold">Internal Storage</th>
                <th className="py-3.5 px-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 text-sm">
              {productList.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-10 text-center text-sm text-slate-400"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                productList.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      {product.productName || "—"}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {product.brand || "—"}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {product.category || "—"}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {product.price !== undefined &&
                      product.price !== null &&
                      product.price !== ""
                        ? `$${product.price}`
                        : "—"}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {product.color || "—"}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {product.ram || "—"}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {product.internalStorage || "—"}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <ProductRowActions
                        id={product._id?.toString() || product._id}
                        slug={product.slug}
                      />
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
            Showing {productList.length > 0 ? 1 : 0} to {productList.length} of{" "}
            {productList.length} entries
          </span>
          <span className="text-slate-400">
            Total {productList.length} registered products
          </span>
        </div>
      </div>
    </div>
  );
}
