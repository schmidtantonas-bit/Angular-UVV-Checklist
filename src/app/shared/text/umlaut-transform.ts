/**
 * Transforms ASCII digraphs to proper German umlauts for UI display.
 *
 * Core Processing uses ASCII-safe identifiers (ue, oe, ae, ss),
 * but the UI must display proper German characters (ü, ö, ä, ß).
 *
 * @example
 * toDisplayText('Ueberlastpruefung') // → 'Überlastprüfung'
 * toDisplayText('Maengel') // → 'Mängel'
 */
export function toDisplayText(text: string): string {
  return text
    .replace(/Ue/g, 'Ü')
    .replace(/ue/g, 'ü')
    .replace(/Oe/g, 'Ö')
    .replace(/oe/g, 'ö')
    .replace(/Ae/g, 'Ä')
    .replace(/ae/g, 'ä')
    .replace(/ss\b/g, 'ß'); // only word-final ss → ß (e.g. "Strasse" but not "Wasserschlauch")
}
