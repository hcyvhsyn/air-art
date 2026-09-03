import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import "../globals.css";
import { LOCALES, hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PagePreloader } from "@/components/PagePreloader";
import { FloatingThemeToggle } from "@/components/FloatingThemeToggle";

const themeScript = `
(() => {
  try {
    const stored = window.localStorage.getItem("air-art-theme");
    const theme = stored === "light" || stored === "dark" ? stored : "dark";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.style.colorScheme = "dark";
  }
})();
`;

const clarityScript = `
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "yclc30odko");
`;

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
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full bg-[var(--page-bg)] text-[var(--page-fg)] antialiased transition-colors duration-300">
        <Script
          id="ms-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: clarityScript }}
        />
        <PagePreloader />
        <FloatingThemeToggle />
        {children}
      </body>
    </html>
  );
}
