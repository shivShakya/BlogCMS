export default function UnsupportedSection({ type }: { type: string }) {
  return (
    <div className="p-4 border border-red-500 text-red-600">
      Unsupported section type: {type}
    </div>
  );
}
