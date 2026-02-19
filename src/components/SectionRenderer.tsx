import Hero from "@/components/sections/Hero";
import CTA from "@/components/sections/CTA";

const sectionComponentMap: Record<string, any> = {
  hero: Hero,
  cta: CTA,
};

export default function SectionRenderer({ sections }: { sections: any[] }) {
  return (
    <>
      {sections.map((section) => {
        const Component = sectionComponentMap[section.type];

        if (!Component) {
          console.warn("Unknown section type:", section.type);
          return null;
        }

        return <Component key={section.id} {...section.props} />;
      })}
    </>
  );
}
