// @ts-check
const { test, expect } = require('@playwright/test');

// --color-void, the 60% base (app/globals.css).
const VOID = 'rgb(11, 13, 16)';
// Every colour token in app/globals.css. Nothing else may be rendered.
const PALETTE = [
  VOID,
  'rgb(18, 21, 26)', // carbon
  'rgb(35, 42, 51)', // steel
  'rgb(58, 68, 79)', // steel-light
  'rgb(241, 245, 244)', // clinical
  'rgb(147, 156, 168)', // muted
  'rgb(52, 211, 153)', // surgical
  'rgb(167, 139, 250)', // neon
  'rgb(124, 58, 237)', // neon-deep
];

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toHaveCSS('background-color', VOID);
});

test('page shell loads', async ({ page }) => {
  await expect(page).toHaveTitle(/Agathus Labs/);
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('main')).toHaveCount(1);
});

test('hero, services and footer content', async ({ page }) => {
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toContainText('Precisión digital.');
  await expect(page.getByRole('link', { name: 'Cotizar Proyecto' })).toBeVisible();
  await expect(page.locator('#divisiones article h3')).toHaveText([
    'Segmentación de Imágenes Médicas',
    'Diseño CAD Paramétrico',
    'Impresión 3D Industrial',
  ]);
  await expect(page.locator('footer')).toContainText('© 2026 Agathus Corp.');
  await expect(page.locator('footer')).toContainText('Arequipa, Perú.');
});

test('media slots have a fixed ratio and a caption', async ({ page }) => {
  const slots = page.locator('figure[data-media-slot]');
  await expect(slots).toHaveCount(4);
  for (const slot of await slots.all()) {
    await expect(slot.locator('[data-media-frame]')).not.toHaveCSS('aspect-ratio', 'auto');
    await expect(slot.locator('figcaption')).not.toBeEmpty();
  }
});

test('every reveal element becomes visible on scroll', async ({ page }) => {
  const all = await page.locator('[data-reveal]').all();
  expect(all.length).toBeGreaterThan(0);
  for (const el of all) {
    if (await el.evaluate((node) => getComputedStyle(node).display === 'none')) continue;
    // Centre it: the observer ignores the bottom 10% of the viewport.
    await el.evaluate((node) => node.scrollIntoView({ block: 'center' }));
    await expect(el).toHaveCSS('opacity', '1');
  }
  // Transitions settled: nothing is left clipped.
  await page.waitForTimeout(1500);
  const stuck = await page.evaluate(() =>
    [...document.querySelectorAll('[data-reveal="wipe"]')]
      .filter((el) => getComputedStyle(el).clipPath !== 'none')
      .map((el) => el.outerHTML.slice(0, 120))
  );
  expect(stuck).toEqual([]);
});

test('content is visible with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll('[data-reveal]')]
      .filter((el) => getComputedStyle(el).opacity !== '1')
      .map((el) => el.outerHTML.slice(0, 120))
  );
  expect(hidden).toEqual([]);
});

test('base is the void colour', async ({ page }) => {
  await expect(page.locator('body')).toHaveCSS('background-color', VOID);
});

test('only palette colours are rendered', async ({ page }) => {
  const offenders = await page.evaluate((palette) => {
    const ok = (c) => c === 'rgba(0, 0, 0, 0)' || c === 'transparent' || palette.includes(c);
    const found = new Set();
    for (const el of document.querySelectorAll('body, body *')) {
      if (el.closest('svg') && el.tagName !== 'svg') continue; // logo strokes are checked by eye
      const s = getComputedStyle(el);
      for (const c of [s.color, s.backgroundColor, s.borderTopColor, s.borderBottomColor, s.outlineColor]) {
        if (!ok(c)) found.add(c);
      }
    }
    return [...found];
  }, PALETTE);
  expect(offenders).toEqual([]);
});

test('no shadows or glow anywhere', async ({ page }) => {
  const offenders = await page.evaluate(() =>
    [...document.querySelectorAll('body, body *')]
      .filter((el) => {
        const s = getComputedStyle(el);
        return (
          s.boxShadow !== 'none' ||
          s.textShadow !== 'none' ||
          s.filter !== 'none' ||
          s.backdropFilter !== 'none'
        );
      })
      .map((el) => el.outerHTML.slice(0, 120))
  );
  expect(offenders).toEqual([]);
});

test('border radius never exceeds 2px', async ({ page }) => {
  const offenders = await page.evaluate(() =>
    [...document.querySelectorAll('body, body *')]
      .filter((el) => {
        const s = getComputedStyle(el);
        return [
          s.borderTopLeftRadius,
          s.borderTopRightRadius,
          s.borderBottomLeftRadius,
          s.borderBottomRightRadius,
        ].some((r) => r.includes('%') || r.split(' ').some((v) => parseFloat(v) > 2));
      })
      .map((el) => el.outerHTML.slice(0, 120))
  );
  expect(offenders).toEqual([]);
});

test('no horizontal overflow', async ({ page }) => {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
