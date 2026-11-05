import BrandsTable from "@/Components/BrandsTable";
import React from "react";

export const dynamic = "force-dynamic";

export default function BrandsPage() {
  return (
    <div className="space-y-6">
      <BrandsTable />
    </div>
  );
}
