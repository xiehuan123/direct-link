import { resolveSupportedRedirect } from '@/lib/redirect-resolver';
import { REDIRECT_MATCHES } from '@/lib/adapters';
import { isPlatformEnabled } from '@/lib/settings';
import { loadSettings } from '@/lib/settings-storage';

export default defineContentScript({
  matches: REDIRECT_MATCHES,
  runAt: 'document_start',
  async main() {
    const resolution = resolveSupportedRedirect(location.href);
    if (!resolution) return;
    try {
      const settings = await loadSettings();
      if (isPlatformEnabled(settings, resolution.platform)) location.replace(resolution.destination);
    } catch (error) {
      console.warn('外链直达：读取设置失败，保留原页面。', error);
    }
  },
});
