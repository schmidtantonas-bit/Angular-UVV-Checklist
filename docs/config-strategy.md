# Config-Strategie (Geräte, Varianten, Renderer)

## Ziel
Eine einzige UI/Checklist-Seite, deren Inhalt vollständig aus Konfiguration entsteht:
- **Geräte** (z.B. Drehleiter, Bühne)
- **Modelle** innerhalb einer Gerätefamilie (z.B. `l32`, `l32s`)
- **Prüfvarianten** (z.B. UVV, VDE, Überlast, BASIC/PRO/PLUS)

Damit vermeiden wir duplizierte Seiten/Komponenten pro Gerät/Variante und halten Änderungen lokal in Config-Dateien.

---

## Grundprinzip: Base + Overrides
Für Gerätefamilien:
- **Base** enthält alles, was für die Familie gleich ist (Sections/Items/Defaults).
- **Model-Override** enthält nur die Unterschiede (Bild, Titel, zusätzliche/entfernte Items, geänderte Grenzwerte).

Das sorgt dafür, dass 90% der Struktur nicht kopiert wird, aber Modelle trotzdem sauber getrennt bleiben.

---

## Ordnerstruktur (Empfehlung)

```
src/app/config/
  devices/
    types.ts
    index.ts
    b32.ts
    drehleiter/
      base.ts
      models/
        l32.ts
        l32s.ts

  inspections/
    types.ts
    index.ts
    uvv.ts
    vde.ts
    overload.ts

  build/
    build-checklist-config.ts
```

---

## Geräte-Config (DeviceConfig)
Ein `DeviceConfig` liefert:
- `overview` (Titel/Subtitle/Bild)
- `sections` (Checklist Sections + Items)

Beispiel-Exports:
- `devices/drehleiter/base.ts` → `DREHLEITER_BASE_SECTIONS`
- `devices/drehleiter/models/l32.ts` → `L32_DEVICE_CONFIG`
- `devices/index.ts` → Registry + Helper (`getDeviceConfig`, `overviewForDevice`, `sectionsForDevice`)

**Registry-Pattern**
- Alle Geräte/Modelle werden in `devices/index.ts` registriert.
- UI fragt niemals direkt `l32.ts`/`b32.ts` an, sondern immer über `getDeviceConfig(deviceType)`.

Vorteil: Neue Geräte werden nur im Registry-Index ergänzt.

---

## Varianten-Config (InspectionConfig)
Varianten sollen nicht in Device-Dateien “fest verdrahtet” werden.
Stattdessen:
- `InspectionConfig` beschreibt nur variantenspezifische Ergänzungen/Regeln (z.B. zusätzliche Sections, Messwerte, Validierungen).

Beispiele:
- VDE: zusätzliche Mess-Sections, Grenzwerte, Pflichtfelder
- Überlast: andere Checks/Steps
- BASIC/PRO/PLUS: Feature-Toggles oder Zusatz-Items

---

## Kombinieren: BuildChecklistConfig
Die eigentliche “laufende” Config entsteht aus:
1) `DeviceConfig` (Modell)
2) `InspectionConfig` (Variante)

Empfohlen ist ein Builder:
`build/build-checklist-config.ts`
- nimmt `{ deviceType, inspectionType }`
- merged/patcht Sections und Regeln
- gibt eine finale `ChecklistConfig` zurück, die der Renderer konsumiert

**Merging-Regeln (Vorschlag)**
- Sections und Items bekommen stabile IDs.
- Merges laufen über IDs (nicht über Index-Positionen).
- Varianten dürfen:
  - Sections hinzufügen/entfernen
  - Items hinzufügen/entfernen
  - einzelne Felder überschreiben (Titel, Grenzwerte, Pflichtflags)

---

## Naming & IDs
Konvention:
- `deviceType`: `l32`, `l32s`, `b32` (klein, ohne Leerzeichen)
- Section IDs: `sec-<device>-<gruppe>-<nr>` (z.B. `sec-l32-cab-1`)
- Item IDs: `<prefix>-<nr>` (z.B. `CAB-01`, `B-01`)

IDs müssen stabil bleiben, weil:
- State/Persistenz später darauf basiert
- Merges über IDs laufen

---

## Status Quo im Projekt
Aktuell existiert bereits:
- `src/app/config/devices/…` (Base + Models + Registry)
- UI liest `overview/sections` über `@config/devices`

Nächster Schritt (wenn gewünscht):
- `src/app/config/inspections/…` + `build-checklist-config.ts`
- `ConfigLoaderService` so umbauen, dass er die finale Config liefert

