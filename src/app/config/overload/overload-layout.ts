import type { OverloadField } from '@features/overload/overload.types';
import { OVERLOAD_VARIANTS, type OverloadVariantId } from './overload-variants';
import { OVERLOAD_RESULTS_UI, type OverloadResultId } from './overload-ui';

declare const ngDevMode: boolean | undefined;

export type OverloadUiLayoutBlock =
  | { kind: 'step'; field: OverloadField }
  | { kind: 'result'; result: OverloadResultId };

export interface OverloadUiLayoutConfig {
  id: OverloadVariantId;
  columns: 1 | 2;
  blocks: readonly OverloadUiLayoutBlock[];
}

export const OVERLOAD_UI_LAYOUTS: Record<OverloadVariantId, OverloadUiLayoutConfig> = {
  standard: {
    id: 'standard',
    columns: 2,
    blocks: [
      { kind: 'step', field: 'preloadMm' },
      { kind: 'step', field: 'loadStartMm' },
      { kind: 'step', field: 'load10MinMm' },
      { kind: 'step', field: 'afterLoadMm' },
      { kind: 'result', result: 'diffPreloadAfter' },
      { kind: 'result', result: 'diffLoadStart10' }
    ]
  },
  buehne: {
    id: 'buehne',
    columns: 1,
    blocks: [
      { kind: 'step', field: 'preloadMm' },
      { kind: 'step', field: 'afterLoadMm' },
      { kind: 'result', result: 'diffPreloadAfter' }
    ]
  }
};

function validateOverloadUiConfiguration() {
  const layouts = Object.values(OVERLOAD_UI_LAYOUTS);

  for (const layout of layouts) {
    const seenStepFields = new Set<OverloadField>();
    const seenResults = new Set<OverloadResultId>();

    for (const block of layout.blocks) {
      if (block.kind === 'step') {
        if (seenStepFields.has(block.field)) {
          throw new Error(`[overload-ui] Duplicate step field "${block.field}" in layout "${layout.id}".`);
        }
        seenStepFields.add(block.field);
      } else {
        if (!OVERLOAD_RESULTS_UI[block.result]) {
          throw new Error(`[overload-ui] Unknown result "${block.result}" in layout "${layout.id}".`);
        }
        if (seenResults.has(block.result)) {
          throw new Error(`[overload-ui] Duplicate result "${block.result}" in layout "${layout.id}".`);
        }
        seenResults.add(block.result);
      }
    }
  }

  const variants = Object.values(OVERLOAD_VARIANTS);
  for (const variant of variants) {
    const layout = OVERLOAD_UI_LAYOUTS[variant.id];
    if (!layout) {
      throw new Error(`[overload-ui] Missing UI layout for variant "${variant.id}".`);
    }

    const layoutStepFields = new Set(layout.blocks.filter((b) => b.kind === 'step').map((b) => b.field));

    for (const field of variant.fields) {
      if (!layoutStepFields.has(field)) {
        throw new Error(
          `[overload-ui] Variant "${variant.id}" activates field "${field}" but layout "${layout.id}" does not render it.`
        );
      }
    }

    for (const field of layoutStepFields) {
      if (!variant.fields.includes(field)) {
        throw new Error(
          `[overload-ui] Layout "${layout.id}" renders field "${field}" but variant "${variant.id}" does not activate it.`
        );
      }
    }

    const layoutResults = layout.blocks.filter((b) => b.kind === 'result').map((b) => b.result);
    for (const result of layoutResults) {
      const required = OVERLOAD_RESULTS_UI[result].requires;
      for (const field of required) {
        if (!variant.fields.includes(field)) {
          throw new Error(
            `[overload-ui] Layout "${layout.id}" includes result "${result}" but variant "${variant.id}" misses required field "${field}".`
          );
        }
      }
    }
  }
}

if (typeof ngDevMode === 'undefined' || ngDevMode) {
  validateOverloadUiConfiguration();
}
