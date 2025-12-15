export type OverloadField =
  | 'preloadMm'
  | 'loadStartMm'
  | 'load10MinMm'
  | 'afterLoadMm';

export type OverloadValues = Record<OverloadField, number | null>;
