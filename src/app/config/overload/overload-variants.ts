import { OverloadField } from '@features/overload/overload.types';

export type OverloadVariantId = 'standard' | 'buehne';

export interface OverloadVariantConfig {
  id: OverloadVariantId;
  fields: readonly OverloadField[];
}

export const OVERLOAD_VARIANTS: Record<OverloadVariantId, OverloadVariantConfig> = {
  standard: {
    id: 'standard',
    fields: ['preloadMm', 'loadStartMm', 'load10MinMm', 'afterLoadMm']
  },
  buehne: {
    id: 'buehne',
    fields: ['preloadMm', 'afterLoadMm']
  }
};

