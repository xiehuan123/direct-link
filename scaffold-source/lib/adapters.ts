import type { PlatformId } from './settings.ts';

export interface SiteAdapter {
  id: PlatformId;
  redirectHost: string;
  targetParameter: string;
  sourceHosts: readonly string[];
}

export const SITE_ADAPTERS: readonly SiteAdapter[] = [
  {
    id: 'juejin',
    redirectHost: 'link.juejin.cn',
    targetParameter: 'target',
    sourceHosts: ['juejin.cn'],
  },
];

export function adapterForRedirectHost(hostname: string): SiteAdapter | undefined {
  const normalized = hostname.toLowerCase();
  return SITE_ADAPTERS.find((adapter) => adapter.redirectHost === normalized);
}

export function platformForSourceHost(hostname: string): PlatformId | undefined {
  const normalized = hostname.toLowerCase();
  return SITE_ADAPTERS.find((adapter) => adapter.sourceHosts.includes(normalized))?.id;
}
