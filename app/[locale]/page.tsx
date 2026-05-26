import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Industries } from "@/components/Industries";
import { Projects } from "@/components/Projects";
import { Partners } from "@/components/Partners";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const t = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} nav={t.nav} ctaLabel={t.hero.ctaContact} />

      <main id="main">
        <Hero locale={locale} hero={t.hero} />
        <Stats stats={t.stats} />
        <About about={t.about} />
        <Services copy={t.services} />
        <Industries copy={t.industries} />
        <Projects copy={t.projects} locale={locale} />
        <Partners copy={t.partners} />
        <WhyChooseUs copy={t.why} />
        <Contact copy={t.contact} serviceItems={t.services.items} />
      </main>

      <Footer
        locale={locale}
        copy={t.footer}
        nav={t.nav}
        contact={{
          addressValue: t.contact.addressValue,
          phoneValue: t.contact.phoneValue,
          emailValue: t.contact.emailValue,
        }}
        serviceItems={t.services.items}
      />
    </>
  );
}
