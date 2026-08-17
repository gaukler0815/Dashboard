import { chromium } from 'playwright';
import fs from 'fs';
const src = fs.readFileSync(new URL('./eloxal-massverteilung-print.html', import.meta.url),'utf8');
const logo = fs.readFileSync(new URL('./.logo-data-uri.txt', import.meta.url),'utf8').trim();
fs.writeFileSync('print.html', src.replaceAll('LOGO_URI', logo));

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage();
const errs = []; page.on('pageerror', e => errs.push(String(e)));
await page.goto('file://'+new URL('./print.html', import.meta.url).pathname, { waitUntil:'networkidle' });
await page.emulateMedia({ media: 'print' });
await page.waitForTimeout(500);
const over = await page.evaluate(() => Array.from(document.querySelectorAll('.body'))
  .map((b,i)=>({page:i+1, overflowPx: b.scrollHeight - b.clientHeight})));
console.log('errors:', errs);
console.table(over);
await page.pdf({
  path: '/home/user/Dashboard/wiki/9_04_Wikierklaerung_Massverteilung_Eloxalschicht.pdf',
  width:'210mm', height:'297mm', printBackground:true, pageRanges:'',
  margin:{top:'0',bottom:'0',left:'0',right:'0'},
});
await browser.close();
