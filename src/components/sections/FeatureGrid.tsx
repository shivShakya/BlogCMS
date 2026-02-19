type Feature = {
  title: string;
  description: string;
};

type Props = {
  title: string;
  features: Feature[];
};

export default function FeatureGrid({ features = [] }: any) {
  return (
    <section className="py-20 grid grid-cols-3 gap-6 px-10">
      {features.map((f: any, i: number) => (
        <div key={i} className="p-6 border rounded-xl">
          <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
          <p>{f.description}</p>
        </div>
      ))}
    </section>
  );
}
