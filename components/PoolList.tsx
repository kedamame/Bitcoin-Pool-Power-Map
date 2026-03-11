"use client";

import { useLang } from "./LangContext";
import type { BtcPool } from "@/app/api/btc-pools/route";
import { countryFlag } from "@/lib/countryFlag";
import { COUNTRY_NAMES } from "@/lib/countryNames";

export default function PoolList({ pools }: { pools: BtcPool[] }) {
  const { locale, t } = useLang();

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700 text-gray-400">
            <th className="px-3 py-2 text-left w-8">{t.col_rank}</th>
            <th className="px-3 py-2 text-left">{t.col_pool}</th>
            <th className="px-3 py-2 text-left">{t.col_country}</th>
            <th className="px-3 py-2 text-right">{t.col_share}</th>
            <th className="px-3 py-2 text-right">{t.col_blocks}</th>
            <th className="px-3 py-2 text-right">{t.col_hashrate}</th>
            <th className="px-3 py-2 text-center w-10">{t.col_link}</th>
          </tr>
        </thead>
        <tbody>
          {pools.map((pool, i) => {
            const flag = countryFlag(pool.country);
            const countryName =
              COUNTRY_NAMES[pool.country]?.[locale] ?? pool.country;
            return (
              <tr
                key={pool.name}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-3 py-2.5 text-gray-500 tabular-nums">
                  {i + 1}
                </td>
                <td className="px-3 py-2.5 font-medium text-white">
                  {pool.name}
                </td>
                <td className="px-3 py-2.5 text-gray-300">
                  <span className="mr-1">{flag}</span>
                  {countryName}
                </td>
                <td className="px-3 py-2.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="hidden sm:block w-20 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(pool.share, 100)}%`,
                          background:
                            pool.share >= 30
                              ? "#DC2626"
                              : pool.share >= 15
                              ? "#EF4444"
                              : pool.share >= 5
                              ? "#F97316"
                              : "#F59E0B",
                        }}
                      />
                    </div>
                    <span className="text-orange-400 font-semibold tabular-nums">
                      {pool.share}%
                    </span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-right text-gray-300 tabular-nums">
                  {pool.blocks24h}
                </td>
                <td className="px-3 py-2.5 text-right text-gray-300 tabular-nums">
                  {pool.hashrateEHs} EH/s
                </td>
                <td className="px-3 py-2.5 text-center">
                  {pool.website && pool.website !== "#" ? (
                    <a
                      href={pool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${pool.name} official website (opens in new tab)`}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      🔗
                    </a>
                  ) : (
                    <span className="text-gray-600">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
