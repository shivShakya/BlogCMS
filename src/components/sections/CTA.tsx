type CTAProps = {
  label: string;
  url: string;
};

export default function CTA({ label, url }: any) {
  return (
    <section className="py-16 text-center bg-black text-white">
      <h2 className="text-3xl mb-4">{label}</h2>

      <a
        href={url}
        className="bg-white text-black px-5 py-2 rounded-lg"
      >
        Click here
      </a>
    </section>
  );
}
