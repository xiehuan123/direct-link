import { platformForSourceHost } from '@/lib/adapters';
import { loadSettings } from '@/lib/settings-storage';
import { directHrefForSource } from '@/lib/source-link';
import { normalizeSettings, SETTINGS_KEY, type ExtensionSettings } from '@/lib/settings';

const BATCH_SIZE = 40;

export default defineContentScript({
  matches: ['https://juejin.cn/*'],
  runAt: 'document_idle',
  async main() {
    const platform = platformForSourceHost(location.hostname);
    if (!platform) return;

    let settings: ExtensionSettings;
    try {
      settings = await loadSettings();
    } catch (error) {
      console.warn('外链直达：读取设置失败，保留页面链接。', error);
      return;
    }

    const rewrite = (anchor: HTMLAnchorElement): void => {
      const directHref = directHrefForSource(anchor.href, platform, settings);
      if (directHref && directHref !== anchor.href) anchor.href = directHref;
    };

    const processBatch = async (anchors: readonly HTMLAnchorElement[]): Promise<void> => {
      for (let index = 0; index < anchors.length; index += BATCH_SIZE) {
        const batch = anchors.slice(index, index + BATCH_SIZE);
        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => {
            for (const anchor of batch) rewrite(anchor);
            resolve();
          });
        });
      }
    };

    void processBatch([...document.querySelectorAll<HTMLAnchorElement>('a[href]')]);

    const observer = new MutationObserver((mutations) => {
      const addedAnchors = new Set<HTMLAnchorElement>();
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node instanceof HTMLAnchorElement && node.hasAttribute('href')) addedAnchors.add(node);
          for (const anchor of node.querySelectorAll<HTMLAnchorElement>('a[href]')) addedAnchors.add(anchor);
        }
      }
      if (addedAnchors.size > 0) void processBatch([...addedAnchors]);
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    browser.storage.onChanged.addListener((changes, areaName) => {
      if (areaName !== 'local' || !changes[SETTINGS_KEY]) return;
      settings = normalizeSettings(changes[SETTINGS_KEY].newValue);
      void processBatch([...document.querySelectorAll<HTMLAnchorElement>('a[href]')]);
    });
  },
});
