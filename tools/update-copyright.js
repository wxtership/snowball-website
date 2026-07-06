#!/usr/bin/env node
/* Stamps the current year into every page's footer copyright.
   Founded in 2022, so the format is "2022-<year>" (or just "2022" in 2022).
   Idempotent: rerun any time (e.g. on Jan 1 or before a deploy) and it
   rewrites whatever year range is there to the correct one. Also fixes the
   glossary shell (charter.html) so regenerated pages stay in sync.

     node tools/update-copyright.js
*/
const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, '..');
const FOUNDED = 2022;
const YEAR = new Date().getFullYear();
const RANGE = YEAR > FOUNDED ? `${FOUNDED}-${YEAR}` : `${FOUNDED}`;

// Matches "&copy; 2026", "&copy; 2022-2025", "© 2026" etc. before "Xtreme Weather".
const RE = /((?:&copy;|©)\s*)\d{4}(?:\s*[-–]\s*\d{4})?(\s+Xtreme Weather)/g;

let changed = 0;
for (const f of fs.readdirSync(SITE)) {
    if (!f.endsWith('.html')) continue;
    const file = path.join(SITE, f);
    const src = fs.readFileSync(file, 'utf8');
    const out = src.replace(RE, `$1${RANGE}$2`);
    if (out !== src) {
        fs.writeFileSync(file, out);
        changed++;
    }
}
console.log(`Copyright set to "${RANGE}" across ${changed} file(s).`);
