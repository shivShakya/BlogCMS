Building a Page Studio with Next.js, Contentful & Versioned Releases
Goal

Build a Page Studio that lets authorised users:

Load pages from Contentful

Edit in a lightweight studio

Preview as a real landing page

Publish immutable, versioned releases

Enforce schema validation

Focus: architecture, determinism, separation of concerns — not UI polish.

Architecture
Contentful
   ↓
Adapter
   ↓
Zod validation
   ↓
Registry renderer
   ↓
Studio (draft)
   ↓
Release snapshot (vX.json)
   ↓
Live route

Principle:
Production never renders from Contentful.
It renders from frozen JSON files:

src/releases/<slug>/vX.json

Result: predictable, auditable, stable.

Implemented
Schema-Driven Renderer

Page + Section validated with Zod

Error boundaries prevent crashes

Central sectionRegistry maps types → components

Missing types fail deterministically

Contentful Adapter

Single contentfulClient.ts

Normalizes data into Page schema

UI never touches CMS directly

Preview and production fully isolated

Preview Route

/preview/[slug]

Fetch → validate → render

Uses same renderer as production

Studio

/studio/[slug]

Edit hero + CTA

Add/reorder sections

Local React state (Redux planned)

Immutable Publish

Creates releases/<slug>/vX.json

Never mutates old versions

Live route reads latest release only

Clear separation:

Layer	Responsibility
Contentful	Authoring
Studio	Draft editing
Release	Immutable snapshot
Live route	Delivery
Pending
Redux Toolkit

draftPage

ui

publish

Centralized state + deterministic publish flow missing.

RBAC

Roles defined but not enforced:

viewer

editor

publisher

Missing middleware + server-side protection.

Deterministic SemVer

Patch: prop/text change

Minor: section added

Major: section removed/type changed

Idempotent publish

Changelog generation

Quality Gates

Schema tests

Version diff tests

Playwright smoke tests

Axe checks

CI enforcement

Accessibility

Current:

Semantic HTML

Proper headings

Focus states

Pending:

Keyboard audit

prefers-reduced-motion

Axe in CI

Documentation

Status

Core CMS pipeline: complete
Hardening (security, testing, automation): pending

Overall: ~65% complete
