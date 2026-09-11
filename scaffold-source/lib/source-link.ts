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

interface MutableHref {
  href: string;
}

export class SourceLinkRewriter {
  readonly #originalHrefs = new WeakMap<MutableHref, string>();
  readonly platform: PlatformId;

  constructor(platform: PlatformId) {
    this.platform = platform;
  }

  apply(anchor: MutableHref, settings: ExtensionSettings): boolean {
    const rememberedHref = this.#originalHrefs.get(anchor);
    const sourceHref = rememberedHref ?? anchor.href;
    const directHref = directHrefForSource(sourceHref, this.platform, settings);

    if (directHref) {
      if (!rememberedHref) this.#originalHrefs.set(anchor, sourceHref);
      if (anchor.href === directHref) return false;
      anchor.href = directHref;
      return true;
    }

    if (!rememberedHref) return false;
    this.#originalHrefs.delete(anchor);
    if (anchor.href === rememberedHref) return false;
    anchor.href = rememberedHref;
    return true;
  }
}
