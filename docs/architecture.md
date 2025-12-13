# Architekturübersicht – UVV/Überlast/VDE Prüf-App (Angular)

## Kernprinzipien
- Konfigurationsgetrieben: Prüfabläufe, Geräte, Varianten (BASIC/PRO/PLUS/Überlast/VDE) kommen aus `src/app/config`.
- Eine dynamische Checklist-Seite: Renderer + Section-Komponenten; keine duplizierten Seiten für Geräte/Varianten.
- Standalone Components, Lazy Routes, klare Layer (pages → features → shared).
- Tokens first: globale CSS-Variablen in `src/styles/variables.css`, Themes via `src/styles/theme.css`.

## Ordnerstruktur (Zielbild)
```
src/app/
├── core/             # Infrastruktur: ConfigLoaderService, ChecklistStateService, PdfService, Guards
├── config/           # Typen + Konfigurationen (devices, inspections, configTree)
├── layouts/          # main-layout (Header/Progress/Footer), empty-layout (Wizard)
├── pages/            # home (Wizard), checklist, protocol, pdf
├── features/         # Fach-Komponenten: sections (renderer, accordion, measurement, vde), mangels (modal/list)
└── shared/           # UI-Komponenten (button, modal, tile, progress-bar, form-input, header, footer)
```

## Routing
- Empty-Layout: Wizard (Start, Auswahl). Route `''` → EmptyLayout → Home/Wizard.
- Main-Layout: Checklist, Protocol, PDF. Enthält Header, optional Progress, Footer. Lazy-loaded Pages.

## State & Datenfluss
- Wizard-Auswahl → ConfigLoaderService baut kombinierte Config (Gerät + Inspection).
- ChecklistStateService (Signals) hält Fortschritt, Eingaben, Messwerte; optional Persistenz (IndexedDB) später.
- Protocol/PDF lesen aus State; PdfService rendert auf Basis des Protokoll-Datenmodells.

## Themes & Styles
- Global imports in `src/styles.scss`: normalize, variables, globals, layout, theme, twemoji-flags.
- Tokens in `variables.css`; Theme-Overrides in `theme.css` (opt-in via `.theme-dark`, `.theme-contrast`).
- Layout-Helfer in `layout.css`; globale Defaults in `globals.css`. Komponenten nutzen SCSS lokal.

## Testing
- Unit: ConfigLoader, Validator, State-Service.
- Snapshot/DOM: SectionRenderer (Accordion/Measurement/VDE).
- E2E: Wizard → Checklist → Protocol → PDF je Variante.

## Performance & Sicherheit
- Lazy Routes, OnPush/Memoize wo sinnvoll.
- Assets lokal (Fonts, Flags), kein CDN-Fetch; Abhängigkeiten pinnen.
- Keine untrusted postinstall/preinstall-Skripte; Node 22, Angular 21.
