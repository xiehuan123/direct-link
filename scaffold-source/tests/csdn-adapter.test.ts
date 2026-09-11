import assert from 'node:assert/strict';
import test from 'node:test';

import { platformForSourceHost } from '../lib/adapters.ts';
import { resolveSupportedRedirect } from '../lib/redirect-resolver.ts';
import { DEFAULT_SETTINGS } from '../lib/settings.ts';
import { directHrefForSource, SourceLinkRewriter } from '../lib/source-link.ts';

const destination = 'https://example.com/csdn-target?from=fixture';
const intermediary = `https://link.csdn.net/?target=${encodeURIComponent(destination)}`;

test('resolves only the verified CSDN target contract', () => {
  assert.deepEqual(resolveSupportedRedirect(intermediary), {
    platform: 'csdn',
    destination,
  });
  assert.equal(resolveSupportedRedirect('https://link.csdn.net/?url=https%3A%2F%2Fexample.com'), null);
  assert.equal(resolveSupportedRedirect('https://evil.link.csdn.net/?target=https%3A%2F%2Fexample.com'), null);
});

test('recognizes only verified CSDN source hosts and respects its switch', () => {
  assert.equal(platformForSourceHost('blog.csdn.net'), 'csdn');
  assert.equal(platformForSourceHost('www.csdn.net'), 'csdn');
  assert.equal(platformForSourceHost('evil.csdn.net'), undefined);
  assert.equal(directHrefForSource(intermediary, 'csdn', { ...DEFAULT_SETTINGS }), destination);
  assert.equal(directHrefForSource(intermediary, 'csdn', { ...DEFAULT_SETTINGS, csdn: false }), null);
});

test('CSDN dynamically handled links restore without a page reload', () => {
  const rewriter = new SourceLinkRewriter('csdn');
  const dynamicallyAdded = { href: intermediary };

  rewriter.apply(dynamicallyAdded, { ...DEFAULT_SETTINGS });
  assert.equal(dynamicallyAdded.href, destination);

  rewriter.apply(dynamicallyAdded, { ...DEFAULT_SETTINGS, csdn: false });
  assert.equal(dynamicallyAdded.href, intermediary);
});
