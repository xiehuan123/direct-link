import { resolveSupportedRedirect } from './redirect-resolver.ts';
import { isPlatformEnabled, type ExtensionSettings, type PlatformId } from './settings.ts';

export function directHrefForSource(
  href: string,
  sourcePlatform: PlatformId,
  settings: ExtensionSettings,
): string | null {
  if (!isPlatformEnabled(settings, sourcePlatform)) return null;
  const resolution = resolveSupportedRedirect(href);
  if (!resolution || resolution.platform !== sourcePlatform) return null;
  return resolution.destination;
}
