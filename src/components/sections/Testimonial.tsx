type Props = {
  quote: string;
  author: string;
};

export default function Testimonial({ quote, author }: any) {
  return (
    <section className="py-20 text-center">
      <blockquote className="text-2xl italic mb-4">"{quote}"</blockquote>
      <p className="font-semibold">— {author}</p>
    </section>
  );
}
