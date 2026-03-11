"use client";

import dynamic from "next/dynamic";
import type { BtcPool } from "@/app/api/btc-pools/route";

const WorldMap = dynamic(() => import("./WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-900 animate-pulse flex items-center justify-center text-gray-600">
      Loading map...
    </div>
  ),
});

export default function MapWrapper({ pools }: { pools: BtcPool[] }) {
  return <WorldMap pools={pools} />;
}
