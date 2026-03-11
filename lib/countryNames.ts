/**
 * ISO 3166-1 alpha-2 コード → 国名マッピング（日本語・英語）
 */
export const COUNTRY_NAMES: Record<string, { ja: string; en: string }> = {
  US: { ja: "アメリカ", en: "United States" },
  CN: { ja: "中国", en: "China" },
  RU: { ja: "ロシア", en: "Russia" },
  CZ: { ja: "チェコ", en: "Czech Republic" },
  JP: { ja: "日本", en: "Japan" },
  CH: { ja: "スイス", en: "Switzerland" },
  DE: { ja: "ドイツ", en: "Germany" },
  GB: { ja: "イギリス", en: "United Kingdom" },
  CA: { ja: "カナダ", en: "Canada" },
  AU: { ja: "オーストラリア", en: "Australia" },
  BR: { ja: "ブラジル", en: "Brazil" },
  IN: { ja: "インド", en: "India" },
  KR: { ja: "韓国", en: "South Korea" },
  TR: { ja: "トルコ", en: "Turkey" },
  IR: { ja: "イラン", en: "Iran" },
  SA: { ja: "サウジアラビア", en: "Saudi Arabia" },
  EG: { ja: "エジプト", en: "Egypt" },
  ZA: { ja: "南アフリカ", en: "South Africa" },
  NG: { ja: "ナイジェリア", en: "Nigeria" },
  SK: { ja: "スロバキア", en: "Slovakia" },
  XX: { ja: "不明", en: "Unknown" },
};
