# Conventions & Best Practices

## Komponenten & Layouts
- Standalone Components.
- Layouts: `empty-layout` (Wizard), `main-layout` (Header, Progress optional, Footer).
- Struktur: Pages → Features → Shared UI. Keine Fachlogik in Shared.
- Inputs/Outputs klar typisieren; Template-Logik minimal halten.

## Styling
- Global: `src/styles.scss` importiert normalize, variables, globals, layout, theme, twemoji-flags.
- Tokens: `variables.css`; Themes: `theme.css` (opt-in per Klasse auf `<body>` oder Root).
- Layout-Utilities: `layout.css` (section spacing, container).
- Komponenten nutzen SCSS; selektiere primär über Klassen, keine IDs für Styling.

## Selektoren für QA/Kommunikation
- Keine flächendeckenden IDs. Nutze `data-ui` (oder `data-testid`) für stabile Marker, z. B.:
  - `data-ui="section-fahrzeughaus"`
  - `data-ui="btn-start"`
  - `data-ui="input-kennzeichen"`
- Wrapper (Sections) können Klasse + `data-ui` bekommen, z. B. `<section class="check-section" data-ui="section-fahrzeughaus">`.

## Config & Typen
- Typdefinitionen unter `src/app/config/types`.
- Devices/Inspections in `config/devices` und `config/inspections`; Kombis/Tree in `config/index.ts`.
- Validierung: Build-Time (TS/Zod) + Runtime-Fallback (UI-Fallback bei fehlenden Feldern).

## State & Services
- Signals in Services (ChecklistStateService).
- ConfigLoaderService baut Config aus Wizard-Auswahl.
- Persistenz (IndexedDB) später optional; NgRx nur bei höherer Komplexität.

## Routing
- Empty-Layout für Wizard (`''`).
- Main-Layout für Checklist/Protocol/PDF (Lazy Routes).
- 404 → Redirect auf Wizard (oder eigene NotFound-Page).

## Testing
- Unit: Loader/Validator/State.
- Snapshot/DOM: Renderer.
- E2E: Wizard → Checklist → Protocol → PDF pro Variante.
- Test-Selektoren via `data-testid`/`data-ui`.

## Performance & Sicherheit
- Lazy Routes, OnPush wo passend.
- Assets lokal (Fonts/Flags); Dependencies pinnen; keine untrusted install-Skripte.
- Node 22.x, Angular 21.x, keine globalen CLI-Installs nötig (npx).
