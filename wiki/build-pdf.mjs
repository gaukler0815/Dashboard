import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const here = path.dirname(new URL(import.meta.url).pathname);
const src  = fs.readFileSync(path.join(here, 'eloxal-massverteilung-print.html'), 'utf8');
const logo = fs.readFileSync(path.join(here, '.logo-data-uri.txt'), 'utf8').trim();

// The hero illustration: use the supplied artwork if it is present in wiki/assets/,
// otherwise fall back to the inline SVG recreation that ships in the HTML.
const MIME = { '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp' };
const hero = ['eloxal-massprinzip.png','eloxal-massprinzip.jpg','eloxal-massprinzip.jpeg','eloxal-massprinzip.webp']
  .map(f => path.join(here, 'assets', f))
  .find(fs.existsSync);

let html = src.replaceAll('LOGO_URI', logo);

if (hero) {
  const uri = `data:${MIME[path.extname(hero).toLowerCase()]};base64,` +
              fs.readFileSync(hero).toString('base64');
  // The artwork already carries the German title and subtitle, so only the
  // English subtitle line is kept underneath it.
  html = html.replace(
    /<!--HERO:START-->[\s\S]*?<!--HERO:END-->/,
    `<img class="heroimg" src="${uri}" alt="Eloxalschicht – Maßprinzip bei 15 µm">\n` +
    `    <p class="fs heroen">2/3 penetration – 1/3 build-up relative to the as-delivered surface</p>`
  );
  console.log('hero image:', path.relative(here, hero));
} else {
  console.log('hero image: none found in wiki/assets/ — using the inline SVG');
}

const tmp = path.join(here, 'print.html');
fs.writeFileSync(tmp, html);

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage();
const errs = [];
page.on('pageerror', e => errs.push(String(e)));
await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });
await page.waitForTimeout(500);

const over = await page.evaluate(() => Array.from(document.querySelectorAll('.body'))
  .map((b, i) => ({ page: i + 1, overflowPx: b.scrollHeight - b.clientHeight })));
if (errs.length) console.log('page errors:', errs);
console.table(over);
const bad = over.filter(o => o.overflowPx > 0);
if (bad.length) console.warn('WARNING: content clipped on page(s)', bad.map(o => o.page).join(', '));

await page.pdf({
  path: path.join(here, '9_04_Wikierklaerung_Massverteilung_Eloxalschicht.pdf'),
  width: '210mm', height: '297mm', printBackground: true,
  margin: { top: '0', bottom: '0', left: '0', right: '0' },
});
await browser.close();
fs.unlinkSync(tmp);
console.log('written: 9_04_Wikierklaerung_Massverteilung_Eloxalschicht.pdf');
