import React from "react";
import BrandsTableClient from "./BrandsTableClient";

export default async function BrandsTable() {
  let brands = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brands`, {
      cache: "no-store",
    });
    if (res.ok) {
      brands = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch brands:", error);
  }

  const brandList = Array.isArray(brands) ? brands : [];

  return <BrandsTableClient initialBrands={brandList} />;
}
