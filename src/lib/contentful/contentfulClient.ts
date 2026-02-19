import { createClient } from "contentful";
import { parsePage, Page } from "@/lib/schema/pageSchema";

/**
 * DELIVERY CLIENT (published content)
 */
const deliveryClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT
});

/**
 * PREVIEW CLIENT (draft content)
 */
const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
  host: "preview.contentful.com",
  environment: process.env.CONTENTFUL_ENVIRONMENT
});

/**
 * INTERNAL: choose client based on preview mode
 */
function getClient(preview: boolean) {
  return preview ? previewClient : deliveryClient;
}

/**
 * Adapter: map Contentful → Page schema
 */
export function mapContentfulToPage(entry: any) {
  if (!entry) return null;

  const fields = entry.fields;

  const sections = (fields.sections || []).map((section: any) => {
      const type = section.fields.type;
      console.log("SECTION TYPE FROM CMS:", type); 


    return {
      id: section.sys.id, // ✅ required
      type,
      props: {
        ...section.fields.props, // ✅ wrap inside props
      },
    };
  });

  const data = {
    pageId: entry.sys.id, // ✅ required by schema
    slug: fields.slug,
    title: fields.title,
    sections,
  };

  return parsePage(data);
}


/**
 *  Fetch page by slug
 */
export async function getPageBySlug(slug: string, preview = false): Promise<Page | null> {
  const client = getClient(preview);

  const response = await client.getEntries({
    content_type: "page",
    "fields.slug": slug,
    include: 2
  });

  if (!response.items.length) return null;

  return mapContentfulToPage(response.items[0]);
}
