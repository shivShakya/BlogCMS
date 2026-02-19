import { getPageBySlug } from "@/lib/contentful/contentfulClient";
import StudioLayout from "@/components/studio/StudioLayout";

export default async function StudioPage({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    return <div>Page not found</div>;
  }

  return <StudioLayout initialPage={page} />;
}
