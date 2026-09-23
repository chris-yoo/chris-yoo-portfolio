import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');

assert.match(html, /유승민 \| Portfolio/);
assert.match(html, /AI Product Builder · Service &amp; Business Development/);
assert.match(html, /연구경험과 개발경험을 통해 AI 역량을 체득하였으며/);
assert.match(html, /고객 인사이트/);
assert.match(html, /사업화/);
assert.match(html, /Human-in-the-Loop/);
assert.match(html, /기술과 사람을 잇는 제품과 서비스로 새로운 가치를 만들겠습니다\./);
assert.match(html, /고객의 문제에서 인사이트를 발견하고, AI를 신뢰할 수 있는 제품과 서비스로 연결하겠습니다\./);
assert.doesNotMatch(html, /한화금융/);

const htmlDirectory = dirname(new URL('./portfolio.html', import.meta.url).pathname);
const imageSources = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((match) => match[1]);
for (const imageSource of imageSources) {
  assert.ok(existsSync(resolve(htmlDirectory, imageSource)), `Missing image asset: ${imageSource}`);
}
assert.equal((html.match(/<section class="slide/g) || []).length, 10, 'Expected ten portfolio slides');

console.log('General portfolio content checks passed.');
