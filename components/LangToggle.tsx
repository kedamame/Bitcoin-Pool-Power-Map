"use client";

import { useLang } from "./LangContext";

export default function LangToggle() {
  const { locale, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label={locale === "ja" ? "Switch to English" : "日本語に切り替える"}
      className="px-3 py-1 rounded-full border border-orange-400 text-sm font-medium text-orange-400 hover:bg-orange-400 hover:text-white transition-colors"
    >
      {locale === "ja" ? "EN" : "日本語"}
    </button>
  );
}
