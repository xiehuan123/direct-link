import assert from 'node:assert/strict';
import test from 'node:test';

import { resolveSupportedRedirect } from '../lib/redirect-resolver.ts';
import { DEFAULT_SETTINGS } from '../lib/settings.ts';
import { SourceLinkRewriter, directHrefForSource } from '../lib/source-link.ts';

const destination = 'https://example.com/docs?q=one%20two#part';
const juejinRedirect = `https://link.juejin.cn/?target=${encodeURIComponent(destination)}`;

test('resolves the verified Juejin target contract without corrupting destination encoding', () => {
  assert.deepEqual(resolveSupportedRedirect(juejinRedirect), {
    platform: 'juejin',
    destination,
  });
});

test('decodes a whole destination only until it becomes a valid HTTP URL', () => {
  const twiceEncoded = encodeURIComponent(encodeURIComponent('https://example.com/a?x=1%202'));
  assert.equal(
    resolveSupportedRedirect(`https://link.juejin.cn/?target=${twiceEncoded}`)?.destination,
    'https://example.com/a?x=1%202',
  );
});

test('unwraps supported nested intermediaries within the depth limit', () => {
  const inner = `https://link.juejin.cn/?target=${encodeURIComponent('https://example.com/final')}`;
  const outer = `https://link.juejin.cn/?target=${encodeURIComponent(inner)}`;
  assert.equal(resolveSupportedRedirect(outer)?.destination, 'https://example.com/final');
});

test('preserves original behavior for unsafe or unsupported inputs', () => {
  const rejected = [
    'https://link.juejin.cn/?url=https%3A%2F%2Fexample.com',
    'https://not-link.juejin.cn/?target=https%3A%2F%2Fexample.com',
    'https://link.juejin.cn/?target=javascript%3Aalert(1)',
    'https://link.juejin.cn/?target=data%3Atext%2Fhtml%2Cbad',
    'https://link.juejin.cn/?target=https%3A%2F%2Fuser%3Apass%40example.com',
    'https://link.juejin.cn/?target=',
  ];
  for (const value of rejected) assert.equal(resolveSupportedRedirect(value), null, value);
});

test('rejects a destination value over the 8192-character limit', () => {
  const oversized = `https://example.com/${'a'.repeat(8193)}`;
  assert.equal(
    resolveSupportedRedirect(`https://link.juejin.cn/?target=${encodeURIComponent(oversized)}`),
    null,
  );
});

test('rejects same-address loops and nesting beyond three supported hops', () => {
  const self = 'https://link.juejin.cn/?target=https%3A%2F%2Flink.juejin.cn%2F';
  assert.equal(resolveSupportedRedirect(self), null);

  let nested = 'https://example.com/final';
  for (let index = 0; index < 4; index += 1) {
    nested = `https://link.juejin.cn/?target=${encodeURIComponent(nested)}`;
  }
  assert.equal(resolveSupportedRedirect(nested), null);
});

test('source-page decision requires matching platform and enabled switches', () => {
  assert.equal(directHrefForSource(juejinRedirect, 'juejin', { ...DEFAULT_SETTINGS }), destination);
  assert.equal(directHrefForSource(juejinRedirect, 'zhihu', { ...DEFAULT_SETTINGS }), null);
  assert.equal(directHrefForSource(juejinRedirect, 'juejin', { ...DEFAULT_SETTINGS, juejin: false }), null);
  assert.equal(directHrefForSource(juejinRedirect, 'juejin', { ...DEFAULT_SETTINGS, enabled: false }), null);
});

test('source-page rewriter restores the original intermediary when disabled', () => {
  const rewriter = new SourceLinkRewriter('juejin');
  const existing = { href: juejinRedirect };
  const dynamicallyAdded = { href: juejinRedirect };

  rewriter.apply(existing, { ...DEFAULT_SETTINGS });
  rewriter.apply(dynamicallyAdded, { ...DEFAULT_SETTINGS });
  assert.equal(existing.href, destination);
  assert.equal(dynamicallyAdded.href, destination);

  rewriter.apply(existing, { ...DEFAULT_SETTINGS, juejin: false });
  rewriter.apply(dynamicallyAdded, { ...DEFAULT_SETTINGS, enabled: false });
  assert.equal(existing.href, juejinRedirect);
  assert.equal(dynamicallyAdded.href, juejinRedirect);
});
