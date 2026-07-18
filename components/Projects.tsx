import { Section } from "./Section";
import { projects } from "@/lib/projects";
import { ProjectShowcase, type ProjectShowcaseCopy } from "./ProjectShowcase";

interface Props {
  copy: {
    eyebrow: string;
    title: string;
    subtitle: string;
  } & ProjectShowcaseCopy;
  locale: string;
}

export function Projects({ copy, locale }: Props) {
  return (
    <Section
      id="projects"
      eyebrow={copy.eyebrow}
      title={copy.title}
      subtitle={copy.subtitle}
      tone="dark"
    >
      <ProjectShowcase projects={projects} copy={copy} locale={locale} />
    </Section>
  );
}
