import assert from 'node:assert/strict';
import test from 'node:test';

import { platformForSourceHost } from '../lib/adapters.ts';
import { resolveSupportedRedirect } from '../lib/redirect-resolver.ts';
import { DEFAULT_SETTINGS } from '../lib/settings.ts';
import { directHrefForSource } from '../lib/source-link.ts';

const destination = 'https://example.com/zhihu-target?from=fixture';
const intermediary = `https://link.zhihu.com/?target=${encodeURIComponent(destination)}`;

test('resolves only the verified Zhihu target contract', () => {
  assert.deepEqual(resolveSupportedRedirect(intermediary), {
    platform: 'zhihu',
    destination,
  });
  assert.equal(resolveSupportedRedirect('https://link.zhihu.com/?url=https%3A%2F%2Fexample.com'), null);
});

test('recognizes the verified Zhihu source hosts and respects its switch', () => {
  assert.equal(platformForSourceHost('www.zhihu.com'), 'zhihu');
  assert.equal(platformForSourceHost('zhuanlan.zhihu.com'), 'zhihu');
  assert.equal(platformForSourceHost('evil.zhihu.com'), undefined);
  assert.equal(directHrefForSource(intermediary, 'zhihu', { ...DEFAULT_SETTINGS }), destination);
  assert.equal(directHrefForSource(intermediary, 'zhihu', { ...DEFAULT_SETTINGS, zhihu: false }), null);
});
