import LangToggle from "@/components/LangToggle";
import CastButton from "@/components/CastButton";
import PoolList from "@/components/PoolList";
import MapWrapper from "@/components/MapWrapper";
import { fetchPoolsData } from "@/lib/fetchPools";

export const revalidate = 3600;

export default async function Home() {
  const pools = await fetchPoolsData();
  const now = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-gray-950/90 backdrop-blur border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⛏</span>
            <h1 className="text-lg font-bold text-white">Pool Power Map</h1>
          </div>
          <LangToggle />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Subtitle */}
        <div className="text-center text-gray-400 text-sm">
          Bitcoin Mining Pool World Distribution (24h)
        </div>

        {/* World Map */}
        <div className="rounded-xl overflow-hidden border border-gray-800 shadow-xl">
          <MapWrapper pools={pools} />
        </div>

        {/* Pool List */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden shadow-xl">
          <PoolList pools={pools} />
        </div>

        {/* Last updated */}
        <p className="text-center text-xs text-gray-600">
          最終更新 / Last updated: {now} JST
        </p>

        {/* Cast Button */}
        <div className="flex justify-center pb-4">
          <CastButton pools={pools} />
        </div>
      </main>
    </div>
  );
}
