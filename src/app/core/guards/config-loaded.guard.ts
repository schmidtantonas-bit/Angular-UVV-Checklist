import { CanActivateFn } from '@angular/router';

/**
 * Guard: schützt Routen, die eine geladene Config erfordern.
 * Aktuell nur Platzhalter, gibt true zurück.
 */
export const configLoadedGuard: CanActivateFn = () => {
  // TODO: check if config exists; redirect otherwise
  return true;
};
