import "server-only";
import type { Locale } from "./i18n";
import type en from "@/messages/en.json";

type DictionaryShape = typeof en;

const dictionaries: Record<Locale, () => Promise<DictionaryShape>> = {
  az: () => import("@/messages/az.json").then((m) => m as DictionaryShape),
  en: () => import("@/messages/en.json").then((m) => m as DictionaryShape),
  ru: () => import("@/messages/ru.json").then((m) => m as DictionaryShape),
};

export const getDictionary = async (locale: Locale): Promise<DictionaryShape> =>
  dictionaries[locale]();

export type Dictionary = DictionaryShape;
