import assert from 'node:assert/strict';
import test from 'node:test';

import { DEFAULT_SETTINGS, normalizeSettings } from '../lib/settings.ts';

test('new users get every adapter enabled', () => {
  assert.deepEqual(normalizeSettings(undefined), DEFAULT_SETTINGS);
});

test('stored booleans are preserved while malformed values fall back safely', () => {
  assert.deepEqual(
    normalizeSettings({
      enabled: false,
      juejin: true,
      zhihu: 'no',
      csdn: false,
    }),
    {
      enabled: false,
      juejin: true,
      zhihu: true,
      csdn: false,
    },
  );
});
