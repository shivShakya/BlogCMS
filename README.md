Use it here
https://blog-cms-sand.vercel.app/home , 
https://blog-cms-sand.vercel.app/studio/home , 
https://blog-cms-sand.vercel.app/preview/home , 

Why I Built This

This sprint focused on building a deterministic Page Studio system that lets authorised users:

Load page definitions from Contentful

Edit in a lightweight studio

Preview as a real rendered landing page

Publish immutable, versioned releases

Enforce correctness via schema validation

Priority: architecture and determinism, not UI polish.

Core Architecture

Contentful (source of truth)
↓
Adapter layer
↓
Zod schema validation
↓
Registry-based renderer
↓
Studio (draft editing)
↓
Immutable release snapshot
↓
Live route

Key rule:
Production never renders from Contentful.
It renders from frozen JSON:

src/releases/<slug>/vX.json

Result: Predictable. Auditable. Stable.

What’s Implemented
1) Schema-Driven Rendering

Page + Section schemas validated with Zod

Invalid schemas fail safely (error boundaries)

Central sectionRegistry maps types → components

Unknown types fail deterministically

Outcome: Type-safe, crash-resistant rendering.

2) Clean CMS Integration

Dedicated contentfulClient.ts adapter

Normalizes entries into Page schema

UI never touches CMS APIs

Preview and production fully isolated

Outcome: No CMS leakage into UI.

3) True Preview Route

/preview/[slug]

Fetches from Contentful

Validates

Uses exact same renderer as production

No preview-specific rendering logic.

4) Lightweight Studio

/studio/[slug]

Supports:

Editing hero + CTA

Adding sections

Reordering sections

Currently local React state.
Redux Toolkit planned.

5) Immutable Publish Flow

Publishing:

Creates releases/<slug>/vX.json

Never mutates past versions

Production reads latest release only

Clear separation:

Layer	Responsibility
Contentful	Authoring
Studio	Draft editing
Release	Immutable snapshot
Live route	Stable delivery
What’s Pending
1) Redux Toolkit

Planned slices:

draftPage

ui

publish

Needed for centralized state + deterministic publish orchestration.

2) RBAC

Roles defined:

viewer

editor

publisher

Missing:

Middleware protection

Server-side publish guards

Role-aware UI gating

3) Deterministic SemVer

Planned rules:

Patch → prop/text change

Minor → section added

Major → section removed/type changed

Also:

Idempotent publish

Version diffing

Changelog generation

4) Quality Gates

Pending:

Schema unit tests

Version diff tests

Playwright smoke tests

Axe accessibility checks

CI enforcement

Accessibility

Current:

Semantic HTML

Proper heading hierarchy

Tailwind focus states

Pending:

Full keyboard audit

prefers-reduced-motion

Axe in CI

Documentation evidence

Key Lessons

Never render production from a live CMS.

Schema validation prevents runtime instability.

Immutable releases create trust.

CMS systems are architecture problems, not UI problems.

Status

Core CMS pipeline: complete

Security, automation, enforcement: pending

Overall progress: ~65%
