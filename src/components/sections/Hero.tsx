type HeroProps = {
  heading: string;
  subheading?: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

export default function Hero({ heading, subheading, ctaLabel, ctaUrl }: any) {
  return (
    <section className="py-20 text-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">{heading}</h1>
      <p className="text-lg mb-6">{subheading}</p>

      {ctaLabel && (
        <a
          href={ctaUrl}
          className="px-6 py-3 bg-black text-white rounded-xl"
        >
          {ctaLabel}
        </a>
      )}
    </section>
  );
}
