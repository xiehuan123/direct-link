export const PLATFORM_IDS = ['juejin', 'zhihu', 'csdn'] as const;
export type PlatformId = (typeof PLATFORM_IDS)[number];

export interface ExtensionSettings {
  enabled: boolean;
  juejin: boolean;
  zhihu: boolean;
  csdn: boolean;
}

export const SETTINGS_KEY = 'settings';
export const DEFAULT_SETTINGS: Readonly<ExtensionSettings> = Object.freeze({
  enabled: true,
  juejin: true,
  zhihu: true,
  csdn: true,
});

export function normalizeSettings(value: unknown): ExtensionSettings {
  if (!isRecord(value)) return { ...DEFAULT_SETTINGS };
  return {
    enabled: booleanOrDefault(value.enabled, DEFAULT_SETTINGS.enabled),
    juejin: booleanOrDefault(value.juejin, DEFAULT_SETTINGS.juejin),
    zhihu: booleanOrDefault(value.zhihu, DEFAULT_SETTINGS.zhihu),
    csdn: booleanOrDefault(value.csdn, DEFAULT_SETTINGS.csdn),
  };
}

export function isPlatformEnabled(settings: ExtensionSettings, platform: PlatformId): boolean {
  return settings.enabled && settings[platform];
}

function booleanOrDefault(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
