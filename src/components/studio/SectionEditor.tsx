"use client";

export default function SectionEditor({
  section,
  onChange,
}: {
  section: any;
  onChange: (props: any) => void;
}) {
  const props = section.props || {};

  const updateField = (key: string, value: string) => {
    onChange({
      ...props,
      [key]: value,
    });
  };

  return (
    <div className="space-y-3">
      {Object.keys(props).map((key) => (
        <div key={key}>
          <label className="block text-sm font-medium">{key}</label>
          <input
            className="w-full border px-2 py-1"
            value={props[key]}
            onChange={(e) => updateField(key, e.target.value)}
          />
        </div>
      ))}

      {/* If empty props */}
      {Object.keys(props).length === 0 && (
        <div className="text-sm text-gray-500">
          No editable props found. Add fields in CMS.
        </div>
      )}
    </div>
  );
}
