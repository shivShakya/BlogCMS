import Hero from "./Hero";
import CTA from "./CTA";
import FeatureGrid from "./FeatureGrid";
import Testimonial from "./Testimonial";

export const sectionRegistry = {
  hero: Hero,
  cta: CTA,
  featureGrid: FeatureGrid,
  testimonial: Testimonial
} as const;
