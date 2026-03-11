"use client";

import { useLang } from "./LangContext";
import type { BtcPool } from "@/app/api/btc-pools/route";
import { countryFlag } from "@/lib/countryFlag";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://pool-power-map.vercel.app";

export default function CastButton({ pools }: { pools: BtcPool[] }) {
  const { t } = useLang();

  const handleCast = () => {
    const top3 = pools.slice(0, 3);
    const medals = ["🥇", "🥈", "🥉"];
    const lines = top3.map(
      (p, i) =>
        `${medals[i]} ${p.name} ${countryFlag(p.country)} ${p.share}%`
    );
    const text =
      `⛏ Bitcoin Mining Pool Distribution (24h)\n\n` +
      lines.join("\n") +
      `\n\nCheck the full map 🗺\n${APP_URL}`;
    const url = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleCast}
      className="flex items-center gap-2 px-5 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-full font-medium transition-colors shadow-md"
    >
      <svg width="20" height="20" viewBox="0 0 1000 1000" fill="currentColor" aria-hidden="true">
        <path d="M257.778 155.556h484.444v688.889H657.778V500H342.222v344.445H257.778z" />
        <path d="M128.889 500l128.889-344.444v688.888z" />
        <path d="M871.111 500L742.222 155.556v688.888z" />
      </svg>
      {t.cast_button}
    </button>
  );
}
