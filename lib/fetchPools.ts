import type { BtcPool } from "@/app/api/btc-pools/route";
import poolCountriesJson from "@/data/pool-countries.json";
import fallbackData from "@/data/btc-pools-fallback.json";

const POOL_WEBSITES: Record<string, string> = {
  "Foundry USA": "https://foundrydigital.com",
  "AntPool": "https://antpool.com",
  "F2Pool": "https://f2pool.com",
  "ViaBTC": "https://viabtc.com",
  "Binance Pool": "https://pool.binance.com",
  "SpiderPool": "https://spider.com",
  "MARA Pool": "https://marathondh.com",
  "Luxor": "https://luxor.tech",
  "Braiins Pool": "https://braiins.com",
  "BTC.com": "https://btc.com",
  "SBI Crypto": "https://sbicrypto.com",
  "Poolin": "https://poolin.com",
  "EMCD": "https://emcd.io",
  "EMCDPool": "https://emcd.io",
  "OKX Pool": "https://www.okx.com/pool",
};

const poolCountries = poolCountriesJson as Record<string, string>;

type MempoolPool = {
  name: string;
  share: number;
  blockCount: number;
};

type MempoolHashratePool = {
  name: string;
  avgHashrate?: number;
};

export async function fetchPoolsData(): Promise<BtcPool[]> {
  try {
    const [poolsRes, hashrateRes] = await Promise.all([
      fetch("https://mempool.space/api/v1/mining/pools/24h", {
        next: { revalidate: 3600 },
      }),
      fetch("https://mempool.space/api/v1/mining/hashrate/pools/24h", {
        next: { revalidate: 3600 },
      }),
    ]);

    if (!poolsRes.ok) throw new Error(`pools fetch failed: ${poolsRes.status}`);

    const poolsData = await poolsRes.json() as { pools: MempoolPool[] };
    const hashrateData = hashrateRes.ok
      ? (await hashrateRes.json() as { pools?: MempoolHashratePool[] })
      : null;

    const pools = Array.isArray(poolsData.pools) ? poolsData.pools : [];
    const totalBlocks = pools.reduce((sum, p) => sum + (p.blockCount ?? 0), 0);

    const hashrateMap: Record<string, number> = {};
    if (Array.isArray(hashrateData?.pools)) {
      for (const p of hashrateData!.pools!) {
        if (typeof p.name === "string") {
          hashrateMap[p.name] = (p.avgHashrate ?? 0) / 1e18;
        }
      }
    }

    const result: BtcPool[] = pools.map((p) => {
      const share =
        totalBlocks > 0 ? (p.blockCount / totalBlocks) * 100 : p.share;
      const country = poolCountries[p.name] ?? "XX";
      return {
        name: p.name,
        share: Math.round(share * 10) / 10,
        blocks24h: p.blockCount,
        hashrateEHs:
          Math.round((hashrateMap[p.name] ?? share * 0.186) * 100) / 100,
        country,
        website: POOL_WEBSITES[p.name] ?? "#",
      };
    });

    result.sort((a, b) => b.share - a.share);
    return result;
  } catch (e) {
    console.error("[fetchPools] error:", e);
    return fallbackData as BtcPool[];
  }
}
