/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { Package, Plus } from "lucide-react";
import ProductRowActions from "./ProductRowActions";

async function getProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000";
    const res = await fetch(`${baseUrl}/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch products: ${res.status} ${res.statusText}`,
      );
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE") {
      throw error;
    }
    console.error("Error fetching products:", error);
    return [];
  }
}

function formatPrice(price) {
  if (price === undefined || price === null || price === "") return "—";
  const num = Number(price);
  if (isNaN(num)) return `$${price}`;
  return `$${num.toLocaleString()}`;
}

function formatCategory(category) {
  if (!category) return "General";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export default async function ProductsTable() {
  const products = await getProducts();

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
              {products.length} {products.length === 1 ? "item" : "items"}
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
      {products.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto mb-3">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">
            No products found
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-5">
            Your inventory is currently empty. Start by adding a new gadget
            product to the database.
          </p>
          <Link
            href="/dashboard/add-product"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Your First Product</span>
          </Link>
        </div>
      ) : (
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
                {products.map((product, index) => {
                  const name =
                    product.productName || product.name || "Unnamed Product";
                  const category = formatCategory(product.category);
                  const storage = product.internalStorage || product.storage;
                  const ram = product.ram;
                  const id = product._id || product.id || index;

                  return (
                    <tr
                      key={id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      {/* Serial Number */}
                      <td className="py-3.5 px-4 font-medium text-slate-400 text-xs text-center">
                        {index + 1}
                      </td>

                      {/* Product Name & Thumbnail */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200/80 overflow-hidden shrink-0 flex items-center justify-center">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <Package className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div
                              className="font-semibold text-slate-900 text-sm truncate max-w-[220px]"
                              title={name}
                            >
                              {name}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono truncate max-w-[180px]">
                              {product.slug ||
                                (product._id
                                  ? `#${String(product._id).slice(-6)}`
                                  : "—")}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {category}
                        </span>
                      </td>

                      {/* Brand */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-700 text-sm">
                          {product.brand || "—"}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-900 text-sm">
                          {formatPrice(product.price)}
                        </span>
                      </td>

                      {/* Specifications (RAM / Storage) */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col gap-1 text-xs">
                          {ram && (
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                                RAM
                              </span>
                              <span className="font-medium">{ram}</span>
                            </div>
                          )}
                          {storage && (
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600">
                                ROM
                              </span>
                              <span className="font-medium">{storage}</span>
                            </div>
                          )}
                          {!ram && !storage && (
                            <span className="text-slate-400">—</span>
                          )}
                        </div>
                      </td>

                      {/* Color */}
                      <td className="py-3.5 px-4">
                        {product.color ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100/80 text-slate-700 border border-slate-200/60">
                            <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
                            <span className="truncate max-w-[120px]">
                              {product.color}
                            </span>
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>

                      {/* Stock / Quantity */}
                      <td className="py-3.5 px-4">
                        {product.quantity !== undefined &&
                        product.quantity !== null ? (
                          <span className="text-xs font-semibold text-slate-700">
                            {product.quantity}{" "}
                            <span className="font-normal text-slate-500">
                              {product.unit || "pcs"}
                            </span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            In Stock
                          </span>
                        )}
                      </td>

                      {/* Actions (Update & Delete) */}
                      <td className="py-3.5 px-4 text-center">
                        <ProductRowActions
                          productId={String(id)}
                          productName={name}
                          id={product?._id}
                          products={products}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <span>
              Showing <span className="font-medium text-slate-700">1</span> to{" "}
              <span className="font-medium text-slate-700">
                {products.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-700">
                {products.length}
              </span>{" "}
              entries
            </span>
            <span className="text-slate-400">
              Total {products.length} registered{" "}
              {products.length === 1 ? "gadget" : "gadgets"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
