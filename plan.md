# GitHub Module V1 Manual Tracking Plan

## Current Task: Notes System UX

- [x] Query Local AI Brain for project notes context.
- [ ] Compare current project notes with `ourstuff.space` notes behavior.
- [ ] Use Spark helper discovery before implementation.
- [ ] Use Copilot auto for code-writing if a write is needed.
- [ ] Verify notes behavior in browser.

## Current Task: Module Enable Settings Behavior

- [x] Inspect module popover render and toggle handlers.
- [x] Stop module enable from auto-opening settings.
- [x] Preserve explicit settings gear behavior.
- [x] Verify syntax and UI behavior.

## AI-First Module Generation (Frontend Slice)

- [x] Add AI generation state to app state (jobs, drafts, prompt-open, prompt text).
- [x] Add API client helpers using optional bearer token and configurable endpoint with safe fallback.
- [x] Add prompt-first module creation flow while keeping JSON install form as advanced fallback.
- [x] Add per-module AI adjust button, prompt box, spinner/status indicators, polling loop, and preview apply/cancel actions.
- [x] Add apply path through `normalizeCustomModule` and existing persistence path for `state.appSettings.customModules`.
- [x] Preserve safe schema metadata on generated custom modules and reject renderer/code fields.
- [x] Add protected backend `aiApi` start/status modes in `C:\Github\ourstuff.space\.firebase\index.js`.
- [x] Browser smoke: built-ins load, project creation works, Modules opens, 14 robot controls mount, prompt generation shows auth-token status without console errors.
- [ ] Add explicit UI copy polish and accessibility passes.
- [ ] Replace temporary localStorage bearer-token bridge with first-class Firebase auth in `projects.ourstuff.space`.

# Module System Schema Manifest Plan

## Mission

Move built-in module definitions out of `index.html` and away from per-module JavaScript files. Keep the static app working while setting up the next step: an AI-first module creator that returns validated schema blueprints rendered by a generic interpreter.

## Constraints

- Keep the app framework-free and GitHub Pages friendly.
- Keep `index.html` as the main app shell for now; do not migrate the full application into a bundler.
- Preserve current localStorage/export/import data shape: `state.appSettings.customModules` and `project.modules[moduleId]`.
- Do not expose model/API keys or add browser-side LLM calls.
- V1 generated modules should be schema-only. Reject custom JavaScript until a real sandbox/action model is designed.
- Preserve existing GitHub module manual tracking behavior.

## Target Architecture

- `assets/modules/builtins.json` is the built-in module schema manifest.
- `assets/js/modules/registry.js` is the generic browser runtime that loads and validates module definitions.
- `index.html` references only the generic registry script, waits for `window.moduleRegistryReady`, and reads built-ins through `window.getBuiltInModuleDefinitions()`.
- Per-module JavaScript definition files are not part of the v1 module system.
- Future generated modules should use known element/action/schema types and be previewed before being applied.
- Future backend work should use the protected Ourstuff Firebase API pattern for authenticated, rate-limited generation jobs.

## Implementation Tasks

- [x] Create `assets/modules/builtins.json` with the 14 built-in module definitions.
- [x] Keep `assets/js/modules/registry.js` as the generic manifest loader.
- [x] Remove the inline `moduleDefinitions` literal from `index.html`.
- [x] Remove per-module script references from `index.html`.
- [x] Start the app after `window.moduleRegistryReady` resolves so fetch timing does not drop built-ins.
- [x] Remove obsolete per-module definition files under `assets/js/modules/`.
- [x] Preserve `moduleHasSettings()` behavior for planner, calendar, and github.

## Helper Assignment And Outcome

- Planning helper: OpenCode with `opencode/mimo-v2.5-free`; retry succeeded and produced the schema-first plan.
- Broad coding helper: OpenCode with `openrouter/openai/gpt-oss-120b:free`; timed out and left a partial registry manifest change.
- Corrective helper: OpenCode with `openrouter/openai/gpt-oss-120b:free`; timed out but created `assets/modules/builtins.json`.
- Orchestrator action: after free helpers failed, Codex made only the minimal repair needed to complete the manifest conversion and verify it.

## Acceptance Criteria

- All 14 built-in modules load from `assets/modules/builtins.json`.
- `index.html` no longer contains per-module definitions or per-module script references.
- Existing UI still sees the same module IDs, names, descriptions, visible data, controlled actions, and primary planner flag.
- Existing custom modules still merge after built-ins.
- GitHub settings/dashboard behavior remains wired.
- No syntax errors in the registry or inline app script extraction.

## Verification Evidence

- `node --check assets/js/modules/registry.js`: pass.
- Extracted inline app script to a temp file and ran `node --check`: pass.
- Parsed `assets/modules/builtins.json`: 14 built-in IDs present.
- Browser smoke loaded the static app over a local HTTP server with no console/page errors and saw all 14 registered module IDs after the obsolete module files were removed.
- Existing module audit script still reports core module hooks present, but it does not yet understand manifest-backed built-ins and now misreports the built-in IDs as not detected.

## Next Module Generator Work

- [ ] Update or replace the module audit script so it validates `assets/modules/builtins.json`.
- [ ] Define strict schema v1 element types such as `listbox`, `textbox`, `textbox_multi`, `select`, `toggle`, `number`, `date`, `textarea`, `section`, and `status`.
- [x] Add AI module generation jobs through protected Ourstuff backend endpoints.
- [x] Add New Module prompt UI, robot adjustment prompt, one active job per module, spinner/status polling, preview, apply, and cancel.
- [ ] Wire full Firebase auth token acquisition in the static projects app instead of requiring manual localStorage bearer token setup.

## Mission

Build a manual-first GitHub tracking module in the single-file static app. The GitHub module should store structured project repo settings, avoid tokens/API fields, persist through localStorage/export/import, and replace the placeholder dashboard with a compact readiness surface.

## Constraints

- Edit only `index.html` unless verification evidence needs a temporary file.
- Keep the app framework-free.
- Keep v1 manual-only: no GitHub API calls, OAuth, tokens, or passphrase fields for GitHub.
- Preserve export/import version behavior; new data stays inside existing project module records.
- Keep old generic fields compatible by mapping `externalName`, `externalUrl`, and `externalId` into GitHub primary repo defaults.
- Related repos are capped at 10.

## Pair Mission Understanding

### Build Pair: Operator + Engineer

- Assigned area: state shape, normalization, settings save handlers, related repo add/remove actions.
- Inspect: `defaultModuleSettings`, `normalizeModules`, module toggle/open handlers, submit/change/click handlers.
- Assumptions to verify: module settings form currently renders but submit handler is missing.
- Done: GitHub settings save, add/remove related repo, configured state, timestamps, and reload persistence all work.

### Shape Pair: Architect + Strategist

- Assigned area: GitHub settings form and dashboard panel information architecture.
- Inspect: `renderModuleSettings`, `renderModulePanel`, existing `integration-panel` and module popover CSS.
- Assumptions to verify: GitHub currently uses generic fields plus secret fields and placeholder dashboard.
- Done: GitHub has purpose-built manual fields, no secret UI, and a compact dashboard with repo links, readiness, issue/PR context, related repos, last checked, and next push notes.

### Guardrail Pair: Steward + Philosopher

- Assigned area: accessibility, responsive resilience, validation, backward compatibility, and verification.
- Inspect: helper functions, CSS responsive rules, audit script, import/export paths.
- Assumptions to verify: current app stores module records in project exports without version changes.
- Done: non-negative counts, trimmed URLs/strings, line-break notes, responsive mobile/desktop forms and dashboard, script syntax, module audit, and diff whitespace checks pass.

## Current State Findings

| Pair | Area | Found | Notes |
| --- | --- | --- | --- |
| Build | Handlers | `save-module-settings` is missing | Audit script reports missing save handler; settings form exists. |
| Shape | GitHub UI | GitHub module is a built-in placeholder | Current dashboard is `renderComingSoonModulePanel`. |
| Shape | Settings UI | Generic fields plus API key/passphrase render for all non-planner modules | GitHub must suppress secret fields in v1. |
| Guardrail | Storage | Module data already rides inside `project.modules[moduleId].settings` | Export/import can remain version 1 if normalization is backward compatible. |

## Council Proposals

### Build Proposal

- Target: add `defaultGitHubSettings(existing)`, `collectGitHubSettings(formData, existing)`, `isGitHubConfigured(settings)`, and click/submit actions.
- First safe change: add normalization helpers before `defaultModuleSettings`, then route `moduleId === "github"` through them.
- Risk: changing generic module behavior; keep GitHub branch isolated.

### Shape Proposal

- Target: render GitHub-specific settings sections for repo identity, release readiness, work queue, and related repos; render a GitHub dashboard panel instead of the placeholder.
- First safe change: branch `renderModuleSettings` for GitHub before shared common/secret fields.
- Risk: form length in popover; use compact grids and textareas that wrap on mobile.

### Guardrail Proposal

- Target: bounded validation and verification through audit, extracted script syntax check, static server browser smoke, desktop/mobile checks, and `git diff --check`.
- First safe change: add reusable trim/count/url helpers and preserve generic legacy keys.
- Risk: browser smoke can be blocked by local browser/tool availability; report evidence honestly.

## Shuffle Review Resolutions

- Build accepts Shape's separate GitHub settings renderer to avoid leaking secret fields.
- Shape accepts Guardrail's bounded field validation instead of strict URL rejection.
- Guardrail accepts Build's isolated GitHub branch because it limits blast radius in the single shared file.

## Consolidated Tasklist

- [x] P0 Add GitHub settings normalization with legacy generic-field mapping.
- [x] P0 Render GitHub-specific manual settings without API key/passphrase fields.
- [x] P0 Add `save-module-settings`, `add-related-repo`, and `remove-related-repo` actions.
- [x] P0 Replace GitHub placeholder dashboard with compact manual tracking panel.
- [x] P1 Preserve Planner/Calendar/generic module behavior.
- [x] P1 Validate persistence through reload/export/import browser smoke.
- [x] P2 Add responsive CSS for GitHub settings/dashboard.
- [x] P2 Run module audit, extracted script syntax check, browser desktop/mobile checks, and `git diff --check`.
- [x] P2 Remove module "Open dashboard" CTA buttons and close the modules menu on outside click.
- [ ] P3 Leave API-ready field shape without any live GitHub sync.

## Approval Gate

- All planning groups submitted proposals: yes
- All planning groups completed cross-review: yes
- Blue/Logos consolidated the tasklist: yes
- Blue/Logos approved implementation: yes
- Each coding group has a specific assignment: yes

## Implementation Lanes

| Lane | Purpose | Owner Pair | Reviewer Pair | Allowed Write Scope | Model Instruction |
| --- | --- | --- | --- | --- | --- |
| 1 | Settings schema, validation, handlers | Build Pair | Guardrail Pair | `index.html` JS helpers and event handlers | `gpt-5.3-codex-spark`, high reasoning |
| 2 | Settings form and dashboard UI | Shape Pair | Build Pair | `index.html` render functions and CSS | `gpt-5.3-codex-spark`, high reasoning |
| 3 | Verification and corrective review | Guardrail Pair | Shape Pair | Read-only checks, then focused fixes in `index.html` if needed | `gpt-5.3-codex-spark`, high reasoning |

## Verification Plan

- Run `C:\Users\jrice\.agents\skills\projects-ourstuff-modules\scripts\Inspect-ProjectsOurstuffModules.ps1`.
- Extract inline script from `index.html` to a temp `.js` file and run `node --check`.
- Run local static server and browser smoke:
  - create/select a project
  - enable GitHub module
  - save primary repo fields
  - add at least two related repos
  - save readiness and issue/PR values
  - reload and confirm persistence
  - export, clear/import, and confirm structured data survives
  - inspect desktop and mobile widths
- Run `git diff --check`.

## Pair Failure Notes

### Pair Failure Note

- `Pair:` Build Pair
- `Phase:` Advisory review during implementation
- `Observed failure:` Reviewed an intermediate file state and reported several already-in-progress gaps as final gaps.
- `Evidence:` Handler/dashboard findings were useful but stale by the time integration continued.
- `Impact:` Low; Blue/Logos verified each finding against current files before acting.
- `Correction needed now:` Re-run final local checks after integration.
- `Future skill guidance:` Sidecar reviewers should label findings as snapshot-based and prioritize invariant risks when shared files are actively changing.

---

# App Shell Scroll Fit Plan

## Mission

Remove the slight page-level vertical scroll from the main UI. The browser viewport should hold the top bar and the main shell exactly, while the project selector and project body align to the same available height and scroll only inside their own child regions. Mobile should keep the intentional bottom gap, including device-bezel and no-bottom-button cases.

## Pair Mission Understanding

### Build Pair: Operator + Engineer

- Assigned area: viewport sizing, shell height math, scroll container ownership, and implementation feasibility.
- Inspect: `html`, `body`, `.app`, `.topbar`, `.shell`, `.project-index`, `.project-list`, `.project-detail`, `.detail-main`, media rules.
- Assumptions to verify: the body scroll comes from `.shell` padding plus content height instead of a bounded parent layout.
- Done: `document.documentElement.scrollHeight <= window.innerHeight + 1` on desktop and mobile, with inner project panels still scrollable.

### Shape Pair: Architect + Strategist

- Assigned area: product-layout feel, selector/detail parity, gap rhythm, and scrollbar styling.
- Inspect: existing CSS tokens, panel layout, desktop sidebar resize behavior, mobile collapsed/stacked behavior.
- Assumptions to verify: selector and body should read as one equal-height work surface, not as two unrelated cards.
- Done: desktop and mobile shell feel stable, bottom gap is deliberate, scrollbars are quiet and consistent with the design system.

### Guardrail Pair: Steward + Philosopher

- Assigned area: accessibility, mobile browser chrome, keyboard/focus visibility, reduced motion, and regression checks.
- Inspect: responsive breakpoints, focus styles, overflow clipping risks, popovers, horizontal tab scrolling, local verification commands.
- Assumptions to verify: `100dvh` with fallback is safer than raw `100vh` for mobile browser chrome.
- Done: no clipped focusable content, no body scroll, no broken module popover, desktop/mobile browser evidence captured.

## Consolidated Tasklist

- [x] P0 Bound `html`, `body`, `.app`, and `.shell` so the app shell owns the viewport height without document-level vertical scroll.
- [x] P0 Make project selector and project detail share the same computed height, with child regions scrolling.
- [x] P1 Preserve desktop sidebar resize/collapse behavior and mobile layout behavior.
- [x] P1 Add restrained, token-based scrollbar styling for inner scroll containers only.
- [x] P2 Verify desktop and mobile viewport scroll metrics through browser checks.
- [x] P2 Run syntax/whitespace checks for the single-file static app.

## Approval Gate

- All planning groups submitted proposals: yes
- All planning groups completed cross-review: yes
- Blue/Logos consolidated the tasklist: yes
- Blue/Logos approved implementation: yes
- Each coding group has a specific assignment: yes

## Verification Evidence

- Desktop `1440x900`: document and body scroll heights equal viewport height; project selector and detail panel height delta is `0`.
- Mobile `390x844`: document and body scroll heights equal viewport height; project selector and detail panel height delta is `0`; modules popover fits `80..828`.
- Mobile `430x932`: document and body scroll heights equal viewport height; project selector and detail panel height delta is `0`; modules popover fits `80..916`.
- Tablet `768x1024`: document and body scroll heights equal viewport height; project selector and detail panel height delta is `0`; modules popover fits `80..1008`.
- `node` inline-script parse: pass, one inline script parsed.
- `git diff --check`: pass.
