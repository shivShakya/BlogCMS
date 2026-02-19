Page Studio: Next.js, Contentful & Versioned Releases
Goal
Build a Page Studio that lets authorized users:

Load pages from Contentful

Edit in a lightweight studio

Preview as a real landing page

Publish immutable, versioned releases

Enforce schema validation

Focus: Architecture, determinism, separation of concerns — not UI polish.

Architecture
Data Flow
Contentful: Source of truth for raw content.

Adapter: Normalizes data into the Page schema.

Zod Validation: Ensures data integrity.

Registry Renderer: Maps data types to React components.

Studio (Draft): Interface for live editing.

Release Snapshot (vX.json): Immutable file storage.

Live Route: Production delivery.
