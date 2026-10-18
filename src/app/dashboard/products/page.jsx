import ProductsTable from "@/Components/ProductsTable";
import React from "react";

export const dynamic = "force-dynamic";

export default function Products() {
  return (
    <div className="space-y-6">
      <ProductsTable />
    </div>
  );
}
