# UVV/Überlast/VDE Prüf-App (Angular)

Angular-Setup für die geplante Prüf-App (UVV, Überlast, Mängel, VDE). Die App wird komplett konfigurationsgetrieben aufgebaut: Eine Checklisten-Seite rendert alle Abschnitte dynamisch, basierend auf Datenstrukturen statt hart codierter Abläufe.

## Voraussetzungen

- Node.js >= 22.12 (empfohlen via `nvm`)
- npm (kommt mit Node)
- Keine globalen Angular-CLI-Installationen nötig – `npx @angular/cli` reicht

### Node mit nvm (optional, aber empfohlen)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
nvm install 22.12.0
nvm use 22.12.0
```

## Projekt starten

```bash
npm install
npm start
# dann http://localhost:4200/
```

Build für Produktion:

```bash
npm run build
```

Tests (Vitest):

```bash
npm test
```

## Geplante Architektur (konfigurationsgetrieben)

```
src/app/
├── core/        # Infrastruktur: ConfigLoaderService, ChecklistStateService, PdfService, Guards
├── config/      # Alle Konfigurationen + Typen (Checklists, Devices, Inspections)
├── layouts/     # main-layout, empty-layout
├── pages/       # home (Wizard), checklist, protocol, pdf
├── features/    # sections (accordion, measurement, vde, renderer), mangels (modal, list)
└── shared/      # UI-Komponenten (button, modal, tile, progress-bar, form-input, header, pipes)
```

Kernidee: Eine Checklisten-Seite + Renderer, die Section-Configs (Accordion, Messwerte, VDE) dynamisch aus `config/` einliest. Neue Gerätetypen oder Prüfvarianten erfordern nur neue Config-Dateien.

## Erste Roadmap-Schritte

1) **Typen & Datenmodell**: `config/types` für Checklist, Section, Item/Field, Validation.  
2) **ConfigLoaderService**: Wizard-Auswahl -> passende Config laden/mergen (Gerät + Inspection).  
3) **Layout & Routing**: `empty-layout` (Wizard), `main-layout` (Header, Progressbar), Routing inkl. Resolver.  
4) **Checklist Renderer**: Accordion-/Measurement-/VDE-Sections aus Config rendern; Fallback UI bei fehlenden Daten.  
5) **State & Persistenz**: `ChecklistStateService` mit Signals; später optional IndexedDB für Offline.  
6) **Protocol & PDF**: Protokoll-View, PdfService (HTML/CSS-basiert), Fotohandling spezifizieren.  
7) **Tests**: Unit (Loader/Validator/State), Snapshot (SectionRenderer), E2E (Wizard → Checklist → Protocol → PDF).

## Nützliche CLI-Befehle

- Neues Element generieren: `npx ng generate component shared/components/button`  
- Hilfe & Schematics: `npx ng generate --help`  
- Linting/Formatting: Prettier-Setup ist aktiv (`printWidth: 100`, `'`-Quotes); Angular CLI Lint kann später ergänzt werden.
