import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { LOCALES, hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PagePreloader } from "@/components/PagePreloader";

const inter = Inter({
  subsets: ["latin", "cyrillic", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    metadataBase: new URL("https://airart.az"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        az: "/az",
        en: "/en",
        ru: "/ru",
        "x-default": "/az",
      },
    },
    openGraph: {
      type: "website",
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      siteName: "Air-Art MMC",
      locale: locale === "az" ? "az_AZ" : locale === "ru" ? "ru_RU" : "en_US",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const htmlLang: Record<Locale, string> = {
    az: "az",
    en: "en",
    ru: "ru",
  };

  return (
    <html
      lang={htmlLang[locale]}
      className={`${inter.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-white text-ink antialiased">
        <PagePreloader />
        {children}
      </body>
    </html>
  );
}
