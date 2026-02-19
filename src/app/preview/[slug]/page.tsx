import { getPageBySlug } from "@/lib/contentful/contentfulClient";
import RenderSection from "@/components/sections/RenderSection";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const page = await getPageBySlug(slug, true); // preview mode

  console.log({page});
  if (!page) {
    return <div>Page not found or invalid schema</div>;
  }

  return (
    <main>
      {(page.sections || []).map((section) => (
        <RenderSection key={section.id} section={section} />
      ))}
    </main>
  );
}







/*
import { parsePage } from "@/lib/schema/pageSchema";
import RenderSection from "@/components/sections/RenderSection";

export default function PreviewPage() {
  // mock page (temporary)
  const data = {
    pageId: "1",
    slug: "home",
    title: "Homepage",
    sections: [
      {
        id: "s1",
        type: "hero",
        props: {
          heading: "Welcome to Page Studio",
          subheading: "Build dynamic pages with schema-driven rendering",
          ctaLabel: "Get Started",
          ctaUrl: "https://example.com"
        }
      }
    ]
  };

  const page = parsePage(data);

  if (!page) {
    return <div>Invalid page data</div>;
  }

  return (
    <main>
      {page.sections.map((section) => (
        <RenderSection key={section.id} section={section} />
      ))}
    </main>
  );
}
*/