"use client";
import React from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductRowActions({ id, slug, products }) {
  const router = useRouter();
  const handleDelete = async (id) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount === 1) {
          console.log("data deleted successfully");
          router.refresh();
        }
        console.log(data);
      });
  };

  const editHref = slug ? `/edit/${slug}` : `/edit/${id}`;

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Edit Button */}
      <Link
        href={editHref}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 active:bg-amber-200 border border-amber-200/80 rounded-xl transition cursor-pointer shadow-2xs"
        title="Edit Product"
      >
        <Pencil className="w-3.5 h-3.5" />
        <span>Edit</span>
      </Link>

      {/* Delete Button */}
      <button
        onClick={() => handleDelete(id)}
        type="button"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 active:bg-rose-200 border border-rose-200/80 rounded-xl transition cursor-pointer shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed"
        title="Delete Product"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Delete</span>
      </button>
    </div>
  );
}
