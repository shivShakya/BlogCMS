import { z } from "zod";

/**
 * HERO SECTION
 */
export const heroSchema = z.object({
  id: z.string(),
  type: z.literal("hero"),
  props: z.object({
    heading: z.string().min(1, "Heading is required"),
    subheading: z.string().optional(),
    ctaLabel: z.string().optional(),
    ctaUrl: z.string().url().optional()
  })
});

/**
 * CTA SECTION
 */
export const ctaSchema = z.object({
  id: z.string(),
  type: z.literal("cta"),
  props: z.object({
    label: z.string().min(1),
    url: z.string().url()
  })
});

/**
 * FEATURE GRID
 */
export const featureGridSchema = z.object({
  id: z.string(),
  type: z.literal("featureGrid"),
  props: z.object({
    title: z.string(),
    features: z.array(
      z.object({
        title: z.string(),
        description: z.string()
      })
    )
  })
});

/**
 * TESTIMONIAL
 */
export const testimonialSchema = z.object({
  id: z.string(),
  type: z.literal("testimonial"),
  props: z.object({
    quote: z.string(),
    author: z.string()
  })
});

/**
 * DISCRIMINATED UNION (key = type)
 */
export const sectionSchema = z.discriminatedUnion("type", [
  heroSchema,
  ctaSchema,
  featureGridSchema,
  testimonialSchema
]);

/**
 * PAGE SCHEMA
 */
export const pageSchema = z.object({
  pageId: z.string(),
  slug: z.string(),
  title: z.string(),
  sections: z.array(sectionSchema)
});

/**
 * TYPES (auto inferred from schema)
 */
export type Page = z.infer<typeof pageSchema>;
export type Section = z.infer<typeof sectionSchema>;

/**
 * SAFE PARSER
 */
export function parsePage(data: unknown): Page | null {
  const result = pageSchema.safeParse(data);
  if (!result.success) {
    console.error("Invalid page schema", result.error.format());
    return null;
  }
  return result.data;
}
