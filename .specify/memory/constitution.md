<!--
Sync Impact Report:
- Version change: 1.1.0 -> 1.2.0
- Modified principles: Added Principle VII (Verification Standards)
- Added sections: VII. Verification Standards
- Templates requiring updates: None
-->

# md-pastebin Constitution

<!-- Example: Spec Constitution, TaskFlow Constitution, etc. -->

## Core Principles

### I. Security & Robustness

<!-- Example: I. Library-First -->

Code MUST be secure by default and robust against failures. Input validation is mandatory for all external data. The application must handle errors gracefully without crashing or exposing sensitive information.

<!-- Example: Every feature starts as a standalone library; Libraries must be self-contained, independently testable, documented; Clear purpose required - no organizational-only libraries -->

### II. Test-Friendly

<!-- Example: II. CLI Interface -->

Architecture MUST support easy testing. Components should be isolated and testable. Logic should be separated from presentation where possible to facilitate unit testing.

<!-- Example: Every library exposes functionality via CLI; Text in/out protocol: stdin/args → stdout, errors → stderr; Support JSON + human-readable formats -->

### III. Technology Stack

<!-- Example: III. Test-First (NON-NEGOTIABLE) -->

The following technology stack is MANDATORY and NON-NEGOTIABLE:

- **Component Library**: shadcn/ui (with Tailwind CSS v4.1)
- **Framework**: React + TypeScript with Vite
- **Animations**: Motion
- **Compression**: lz-string

<!-- Example: TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced -->

### IV. Component Strategy

<!-- Example: IV. Integration Testing -->

shadcn/ui is the PRIMARY and PREFERRED component library.

- **Check Registry First**: ALWAYS check the shadcn registry for an existing component before building a custom one.
- **No Reinvention**: NEVER build a custom component if a shadcn equivalent exists.
- **Standardization**: Use standard shadcn patterns and theming.

<!-- Example: Focus areas requiring integration tests: New library contract tests, Contract changes, Inter-service communication, Shared schemas -->

### V. Corporate Network Compliance

<!-- Example: V. Observability, VI. Versioning & Breaking Changes, VII. Simplicity -->

The development environment MUST be configured to work within the corporate network (Zscaler proxy).

- **Proxy Configuration**: Shell environments MUST have proxy settings configured before running network-dependent commands (especially shadcn CLI).
- **Certificate Handling**: NODE_TLS_REJECT_UNAUTHORIZED="0" may be required for tools that do not use the system certificate store.

### VI. Git Hygiene

Commits MUST be atomic and accompanied by strong, descriptive messages.

- **Atomic Commits**: Group related changes. Avoid monolithic "wip" commits.
- **Message Format**: Use conventional commits (e.g., eat:, ix:, docs:,
  efactor:) or clear imperative statements.
- **Context**: Explain _why_ a change was made, not just _what_ changed.

<!-- Example: Text I/O ensures debuggability; Structured logging required; Or: MAJOR.MINOR.BUILD format; Or: Start simple, YAGNI principles -->

### VII. Verification Standards

Features are considered complete ONLY when they pass all builds and tests.

- **Build Success**: The project must build without errors.
- **Test Pass**: All existing tests must pass. No feature shall be marked as done if the test suite is failing.

## Technical Constraints

<!-- Example: Additional Constraints, Security Requirements, Performance Standards, etc. -->

All development must adhere strictly to the defined technology stack. No new libraries or frameworks should be introduced without explicit justification and amendment to this constitution.

## Development Workflow

<!-- Example: Development Workflow, Review Process, Quality Gates, etc. -->

### Proxy Setup

Before running pnpm dlx shadcn@latest ... or similar commands, ensure your shell is configured:

`powershell
$env:HTTPS_PROXY="http://127.0.0.1:9000";
$env:HTTPS_PROXY="http://127.0.0.1:9000";
$env:NODE_TLS_REJECT_UNAUTHORIZED="0";
`

## Governance

<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

This Constitution supersedes all other project documentation and practices. Amendments require a version bump and explicit documentation in the Sync Impact Report. All Pull Requests must be verified against these principles.

**Version**: 1.2.0 | **Ratified**: 2025-11-19 | **Last Amended**: 2025-11-20

<!-- Example: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->
