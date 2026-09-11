import { adapterForRedirectHost } from './adapters.ts';
import type { PlatformId } from './settings.ts';

const MAX_INPUT_LENGTH = 8192;
const MAX_SUPPORTED_HOPS = 3;
const MAX_EXTRA_DECODES = 3;
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/;

export interface RedirectResolution {
  platform: PlatformId;
  destination: string;
}

export function resolveSupportedRedirect(input: string): RedirectResolution | null {
  const firstUrl = parseHttpUrl(input);
  if (!firstUrl) return null;
  const firstAdapter = adapterForRedirectHost(firstUrl.hostname);
  if (!firstAdapter) return null;

  const seen = new Set<string>();
  let currentUrl = firstUrl;

  for (let hop = 0; hop < MAX_SUPPORTED_HOPS; hop += 1) {
    if (seen.has(currentUrl.href)) return null;
    seen.add(currentUrl.href);

    const adapter = adapterForRedirectHost(currentUrl.hostname);
    if (!adapter) {
      return { platform: firstAdapter.id, destination: currentUrl.href };
    }

    const targetValue = currentUrl.searchParams.get(adapter.targetParameter);
    const targetUrl = decodeHttpUrl(targetValue);
    if (!targetUrl || targetUrl.href === currentUrl.href || seen.has(targetUrl.href)) return null;

    if (!adapterForRedirectHost(targetUrl.hostname)) {
      return { platform: firstAdapter.id, destination: targetUrl.href };
    }
    currentUrl = targetUrl;
  }

  return null;
}

function decodeHttpUrl(value: string | null): URL | null {
  if (!value) return null;
  let candidate = value.trim();
  if (!candidate || candidate.length > MAX_INPUT_LENGTH || CONTROL_CHARACTERS.test(candidate)) return null;

  for (let attempt = 0; attempt <= MAX_EXTRA_DECODES; attempt += 1) {
    const parsed = parseHttpUrl(candidate);
    if (parsed) return parsed;
    if (attempt === MAX_EXTRA_DECODES) return null;
    try {
      const decoded = decodeURIComponent(candidate);
      if (decoded === candidate) return null;
      candidate = decoded;
    } catch {
      return null;
    }
  }
  return null;
}

function parseHttpUrl(value: string): URL | null {
  if (!value || value.length > MAX_INPUT_LENGTH || CONTROL_CHARACTERS.test(value)) return null;
  try {
    const parsed = new URL(value);
    if ((parsed.protocol !== 'http:' && parsed.protocol !== 'https:') || parsed.username || parsed.password) return null;
    return parsed;
  } catch {
    return null;
  }
}
