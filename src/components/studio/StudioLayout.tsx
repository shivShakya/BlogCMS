"use client";

import { useState } from "react";
import SectionRenderer from "@/components/SectionRenderer";
import SectionEditor from "./SectionEditor";

/** DND KIT */
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

/**
 * Sortable Section Item
 */
function SortableItem({
  section,
  index,
  isActive,
  onSelect,
  onDelete,
}: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onSelect(index)}
      className={`p-2 mb-2 rounded cursor-pointer flex justify-between items-center ${
        isActive ? "bg-blue-100" : "bg-gray-100"
      }`}
    >
      <span>{section.type.toUpperCase()}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(index);
        }}
        className="text-red-500 text-sm"
      >
        ✕
      </button>
    </div>
  );
}

export default function StudioLayout({ initialPage }: { initialPage: any }) {
  const [sections, setSections] = useState(initialPage.sections || []);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const sensors = useSensors(useSensor(PointerSensor));

  const selectedSection =
    selectedIndex !== null ? sections[selectedIndex] : null;

  return (
    <div className="flex h-screen">
      {/* ================= LEFT PANEL ================= */}
      <div className="w-1/4 border-r p-4 overflow-y-auto">
        <h2 className="font-bold mb-4">Sections</h2>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(event) => {
            const { active, over } = event;

            if (!over || active.id === over.id) return;

            const oldIndex = sections.findIndex((s: any) => s.id === active.id);
            const newIndex = sections.findIndex((s: any) => s.id === over.id);

            const newArr = arrayMove(sections, oldIndex, newIndex);

            setSections(newArr);
            setSelectedIndex(newIndex);
          }}
        >
          <SortableContext
            items={sections.map((s: any) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section: any, index: number) => (
              <SortableItem
                key={section.id}
                section={section}
                index={index}
                isActive={index === selectedIndex}
                onSelect={setSelectedIndex}
                onDelete={(idx: number) => {
                  const updated = sections.filter((_: any, i: number) => i !== idx);
                  setSections(updated);
                  setSelectedIndex(updated.length ? 0 : null);
                }}
              />
            ))}
          </SortableContext>
        </DndContext>

        {/* Add Section */}
        <button
          className="mt-4 bg-black text-white px-3 py-2 rounded w-full"
          onClick={() =>
            setSections([
              ...sections,
              {
                id: Date.now().toString(),
                type: "hero",
                props: {
                  heading: "New Hero",
                  subheading: "Edit me",
                },
              },
            ])
          }
        >
          + Add Section
        </button>

        {/* SAVE */}
        <button
          className="mt-4 bg-green-600 text-white px-3 py-2 rounded w-full"
          onClick={async () => {
            await fetch("/api/save-page", {
              method: "POST",
              body: JSON.stringify({
                pageId: initialPage.pageId,
                sections,
              }),
            });

            alert("Saved to Contentful!");
          }}
        >
          💾 Save Draft
        </button>

       {/* PUBLISH VERSIONED RELEASE */}
        <button
          className="mt-2 bg-blue-600 text-white px-3 py-2 rounded w-full"
          onClick={async () => {
            const res = await fetch("/api/publish", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                slug: initialPage.slug,
                page: {
                  pageId: initialPage.pageId,
                  slug: initialPage.slug,
                  title: initialPage.title,
                  sections,
                },
              }),
            });

            const data = await res.json();

            if (data.success) {
              alert(`Published ${data.release.version}`);
            } else {
              alert("Publish failed");
            }
          }}
        >
          🚀 Publish Release
        </button>

      </div>

      {/* ================= MIDDLE PANEL ================= */}
      <div className="w-1/4 border-r p-4 overflow-y-auto">
        <h2 className="font-bold mb-4">Editor</h2>

        {selectedSection ? (
          <SectionEditor
            section={selectedSection}
            onChange={(updatedProps: any) => {
              const newSections = [...sections];

              newSections[selectedIndex!] = {
                ...newSections[selectedIndex!],
                props: updatedProps,
              };

              setSections(newSections);
            }}
          />
        ) : (
          <div>Select a section</div>
        )}
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="w-2/4 p-4 overflow-y-auto">
        <h2 className="font-bold mb-4">Live Preview</h2>

        <SectionRenderer sections={sections} />
      </div>
    </div>
  );
}
