"use client";

import type { BtcPool } from "@/app/api/btc-pools/route";
import { countryFlag } from "@/lib/countryFlag";
import { COUNTRY_NAMES } from "@/lib/countryNames";

type Props = {
  countryCode: string;
  pools: BtcPool[];
};

export default function PoolTooltip({ countryCode, pools }: Props) {
  const countryPools = pools.filter((p) => p.country === countryCode);
  if (countryPools.length === 0) return null;

  const total = countryPools.reduce((sum, p) => sum + p.share, 0);
  const flag = countryFlag(countryCode);
  const name = COUNTRY_NAMES[countryCode]?.en ?? countryCode;

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-3 min-w-[180px] pointer-events-none">
      <div className="flex items-center gap-1.5 mb-2 font-semibold text-white">
        <span className="text-lg">{flag}</span>
        <span>{name}</span>
      </div>
      <div className="border-t border-gray-700 pt-2 space-y-1">
        {countryPools.map((p) => (
          <div key={p.name} className="flex justify-between text-sm gap-4">
            <span className="text-gray-300">{p.name}</span>
            <span className="text-orange-400 font-medium">{p.share}%</span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-700 mt-2 pt-2 flex justify-between text-sm font-semibold">
        <span className="text-gray-400">合計</span>
        <span className="text-orange-300">{Math.round(total * 10) / 10}%</span>
      </div>
    </div>
  );
}
