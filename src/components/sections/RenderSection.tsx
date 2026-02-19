import UnsupportedSection from "./UnSupportedSection";

import Hero from "./Hero";
import CTA from "./CTA";
import FeatureGrid from "./FeatureGrid";
import Testimonial from "./Testimonial";

export default function RenderSection({ section }: any) {
  switch (section.type) {
    case "hero":
      return <Hero {...section.props} />;

    case "cta":
      return <CTA {...section.props} />;

    case "featureGrid":
      return <FeatureGrid {...section.props} />;

    case "testimonial":
      return <Testimonial {...section.props} />;

    default:
      return <UnsupportedSection type={""} />;
  }
}
