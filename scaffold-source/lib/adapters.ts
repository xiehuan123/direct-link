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
  {
    id: 'zhihu',
    redirectHost: 'link.zhihu.com',
    targetParameter: 'target',
    sourceHosts: ['www.zhihu.com', 'zhuanlan.zhihu.com'],
  },
  {
    id: 'csdn',
    redirectHost: 'link.csdn.net',
    targetParameter: 'target',
    sourceHosts: ['blog.csdn.net', 'www.csdn.net'],
  },
];

export const REDIRECT_MATCHES = SITE_ADAPTERS.map(
  (adapter) => `https://${adapter.redirectHost}/*`,
);

export const SOURCE_MATCHES = SITE_ADAPTERS.flatMap((adapter) =>
  adapter.sourceHosts.map((host) => `https://${host}/*`),
);

export function adapterForRedirectHost(hostname: string): SiteAdapter | undefined {
  const normalized = hostname.toLowerCase();
  return SITE_ADAPTERS.find((adapter) => adapter.redirectHost === normalized);
}

export function platformForSourceHost(hostname: string): PlatformId | undefined {
  const normalized = hostname.toLowerCase();
  return SITE_ADAPTERS.find((adapter) => adapter.sourceHosts.includes(normalized))?.id;
}
