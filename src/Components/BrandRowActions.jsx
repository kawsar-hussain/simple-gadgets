"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BrandRowActions({ id, slug }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (brandId) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brands/${brandId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          console.log(data);
          router.refresh();
        }
      });
  };

  const editHref = slug
    ? `/dashboard/edit-brand/${slug}`
    : `/dashboard/edit-brand/${id}`;

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Edit Button */}
      <Link
        href={editHref}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 active:bg-amber-200 border border-amber-200/80 rounded-xl transition cursor-pointer shadow-2xs"
        title="Edit Brand"
      >
        <Pencil className="w-3.5 h-3.5" />
        <span>Edit</span>
      </Link>

      {/* Delete Button */}
      <button
        onClick={() => handleDelete(id)}
        disabled={isDeleting}
        type="button"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 active:bg-rose-200 border border-rose-200/80 rounded-xl transition cursor-pointer shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed"
        title="Delete Brand"
      >
        {isDeleting ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Trash2 className="w-3.5 h-3.5" />
        )}
        <span>{isDeleting ? "Deleting..." : "Delete"}</span>
      </button>
    </div>
  );
}
