/**
 * ISO 3166-1 alpha-2コードから国旗絵文字を生成する。
 * 不正な入力（非ASCII、2文字でないコード等）はフォールバック🌐を返す。
 */
export function countryFlag(iso2: string): string {
  if (!iso2 || iso2 === "XX") return "🌐";
  const upper = iso2.toUpperCase();
  if (!/^[A-Z]{2}$/.test(upper)) return "🌐";
  return String.fromCodePoint(
    ...upper.split("").map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}
