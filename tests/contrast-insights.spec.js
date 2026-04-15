const { test, expect } = require('@playwright/test');

function parseRgbToLinear(rgbString) {
  // Accepts "rgb(r, g, b)" or "rgba(r, g, b, a)" (alpha is ignored for contrast calc here)
  const match = rgbString.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*[\d.]+\s*)?\)/i);
  if (!match) return null;
  const srgb = [Number(match[1]), Number(match[2]), Number(match[3])].map((v) => v / 255);
  const linear = srgb.map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return { r: linear[0], g: linear[1], b: linear[2] };
}

function relativeLuminance(lin) {
  return 0.2126 * lin.r + 0.7152 * lin.g + 0.0722 * lin.b;
}

function contrastRatio(fgRgb, bgRgb) {
  const fgLin = parseRgbToLinear(fgRgb);
  const bgLin = parseRgbToLinear(bgRgb);
  if (!fgLin || !bgLin) return null;
  const L1 = relativeLuminance(fgLin);
  const L2 = relativeLuminance(bgLin);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

test('Insights CTA text meets 4.5:1 in light mode', async ({ page }) => {
  await page.goto('/');

  // Force light mode (site uses `body.light` overrides).
  await page.evaluate(() => document.body.classList.add('light'));

  // Current page version ships an "Insights teaser" without cards.
  // We validate the visible teaser body contrast against the section background.
  const teaser = page.locator('.insights-teaser-body').first();
  await expect(teaser).toBeVisible();

  const { fg, bg } = await teaser.evaluate((el) => {
    const fg = window.getComputedStyle(el).color;
    const insightsSection = document.querySelector('.sec-insights');
    const bg = insightsSection ? window.getComputedStyle(insightsSection).backgroundColor : 'rgb(255, 255, 255)';
    return { fg, bg };
  });

  const computedRatio = contrastRatio(fg, bg);
  expect(computedRatio, `Could not compute contrast from fg=${fg} bg=${bg}`).not.toBeNull();
  expect(computedRatio).toBeGreaterThanOrEqual(4.5);

  // Save reference screenshots for "before/after visual change" workflow.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => {
    const el = document.querySelector('#insights') || document.querySelector('.sec-insights');
    if (el) el.scrollIntoView({ block: 'start' });
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'pw-screenshots/insights-light.png', fullPage: false });

  await page.evaluate(() => document.body.classList.remove('light'));
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'pw-screenshots/insights-dark.png', fullPage: false });
});

