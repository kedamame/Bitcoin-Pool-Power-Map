"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import ja from "@/locales/ja.json";
import en from "@/locales/en.json";

type Locale = "ja" | "en";
type Messages = typeof ja;

const messages: Record<Locale, Messages> = { ja, en };

type LangContextType = {
  locale: Locale;
  t: Messages;
  toggle: () => void;
};

const LangContext = createContext<LangContextType>({
  locale: "ja",
  t: ja,
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ja");
  const toggle = () => setLocale((l) => (l === "ja" ? "en" : "ja"));
  return (
    <LangContext.Provider value={{ locale, t: messages[locale], toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
