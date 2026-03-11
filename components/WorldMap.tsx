"use client";

import { useState, useCallback, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import type { BtcPool } from "@/app/api/btc-pools/route";
import PoolTooltip from "./PoolTooltip";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const ISO_NUMERIC_TO_ALPHA2: Record<string, string> = {
  "840": "US", "156": "CN", "643": "RU", "203": "CZ",
  "392": "JP", "756": "CH", "276": "DE", "826": "GB",
  "124": "CA", "036": "AU", "076": "BR", "356": "IN",
  "410": "KR", "792": "TR", "364": "IR", "682": "SA",
  "818": "EG", "710": "ZA", "566": "NG", "703": "SK",
};

function getCountryColor(share: number): string {
  if (share <= 0) return "#374151";
  if (share < 5) return "#F59E0B";
  if (share < 15) return "#F97316";
  if (share < 30) return "#EF4444";
  return "#DC2626";
}

type TooltipState = {
  countryCode: string;
  x: number;
  y: number;
} | null;

export default function WorldMap({ pools }: { pools: BtcPool[] }) {
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  const countryShareMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of pools) {
      map[p.country] = (map[p.country] ?? 0) + p.share;
    }
    return map;
  }, [pools]);

  const handleMouseEnter = useCallback(
    (geo: Geography, e: React.MouseEvent) => {
      const numericCode = String(geo.properties["numeric"]).padStart(3, "0");
      const alpha2 = ISO_NUMERIC_TO_ALPHA2[numericCode];
      if (alpha2 && (countryShareMap[alpha2] ?? 0) > 0) {
        setTooltip({ countryCode: alpha2, x: e.clientX, y: e.clientY });
      }
    },
    [countryShareMap]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setTooltip((prev) => (prev ? { ...prev, x: e.clientX, y: e.clientY } : null));
  }, []);

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  return (
    <div className="relative w-full" onMouseMove={handleMouseMove}>
      <ComposableMap
        projectionConfig={{ scale: 147 }}
        className="w-full h-auto"
        style={{ background: "#111827" }}
      >
        <ZoomableGroup center={[0, 20]} zoom={1} maxZoom={4}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const numericCode = String(geo.properties["numeric"]).padStart(3, "0");
                const alpha2 = ISO_NUMERIC_TO_ALPHA2[numericCode];
                const share = alpha2 ? (countryShareMap[alpha2] ?? 0) : 0;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getCountryColor(share)}
                    stroke="#1F2937"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", opacity: 0.85, cursor: share > 0 ? "pointer" : "default" },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={(e) => handleMouseEnter(geo, e)}
                    onMouseLeave={handleMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip: fixed positioning with offset applied here only */}
      {tooltip && (
        <div
          className="fixed pointer-events-none z-50"
          style={{ left: tooltip.x + 12, top: tooltip.y - 10 }}
        >
          <PoolTooltip
            countryCode={tooltip.countryCode}
            pools={pools}
          />
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 bg-gray-900/80 rounded-lg p-2 text-xs text-gray-300 space-y-1">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ background: "#DC2626" }}></span> 30%+</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ background: "#EF4444" }}></span> 15–30%</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ background: "#F97316" }}></span> 5–15%</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ background: "#F59E0B" }}></span> 0–5%</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ background: "#374151" }}></span> なし</div>
      </div>
    </div>
  );
}
