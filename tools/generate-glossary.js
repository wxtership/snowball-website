#!/usr/bin/env node
/* Generates the weather glossary from the Snowball bot's definitions knowledge
   base (the same 570+ answers Snowball posts in the Discord). Definitions stay
   maintained in ONE place, the bot repo; rerun this after editing them:

     node tools/generate-glossary.js [path/to/definitions.js]

   Output: glossary.html (hub) + one glossary-<category>.html per category,
   and refreshed <lastmod> entries in sitemap.xml. Pages are built from
   charter.html's live shell (nav/footer), so site chrome changes are picked
   up automatically on regeneration. */

const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, '..');
const DEFS_PATH = process.argv.slice(2).find((a) => !a.startsWith('--'))
  || path.join(SITE, '..', 'snowball', 'snowball', 'definitions.js');
const BASE_URL = 'https://wxtership.github.io/snowball-website';
const TODAY = new Date().toISOString().slice(0, 10);

const { definitions } = require(path.resolve(DEFS_PATH));

/* ------------------------------- categories ------------------------------
   Ordered: the FIRST category whose matcher hits the title wins. Keep prose
   pages to roughly 35 terms (~1,500 words); offices is a reference directory
   and is allowed to run long. */
const CATEGORIES = [
  {
    key: 'nws-offices',
    title: 'NWS Office Codes',
    heading: 'NWS Forecast Office Codes',
    icon: 'assets/icons/weather.png',
    intro: 'Every National Weather Service forecast office has a three-letter identifier, and you will see these codes on radar products, AFDs, and warnings all the time. This directory covers each WFO code that comes up when Xtreme Weather Discord (XWD) members track weather across the country. For how the offices fit into the alert system, see the [[nws-alert-codes]] and [[tornado-severe-alerts]] pages.',
    compact: true,
    match: (t) => /^What is (a WFO|the NWS|[A-Z]{3})\?$/.test(t),
  },
  {
    key: 'spc-outlooks',
    title: 'SPC Outlooks & Risk Categories',
    heading: 'SPC Outlooks & Risk Categories',
    icon: 'assets/icons/small-spc.png',
    intro: 'When the Storm Prediction Center paints a risk area over your town, these are the words behind the colors. This page covers the SPC’s categorical outlooks from Marginal to High Risk, conditional intensity groups, and the discussion products forecasters issue around them. Coverage Experts in the Xtreme Weather Discord (XWD) reference these constantly during severe weather, and the parameters behind them live on the [[instability-cape]] and [[shear-indices]] pages.',
    match: (t) => /SPC|MRGL|SLGT|ENH\b|Moderate Risk|High Risk|Categorical|CIG|MCD|Mesoanalysis|WoFS|ProbSevere|Day 1/i.test(t),
  },
  {
    key: 'tornado-severe-alerts',
    title: 'Tornado & Severe Thunderstorm Alerts',
    heading: 'Tornado & Severe Thunderstorm Alerts',
    icon: 'assets/icons/small-alert.png',
    intro: 'A Tornado Warning is not a Tornado Emergency, and a PDS watch is a very different animal from a regular one. This page explains every tier of tornado and severe thunderstorm alert the NWS issues, including the damage-threat tags you see on modern warnings. These are the alerts Xtreme Weather Discord (XWD) pushes in real time during coverage; the codes for every other hazard live on the [[nws-alert-codes]] page.',
    match: (t) => /Tornado (Emergency|Watch|Warning)|TOR-|PDS|Watch vs|Severe Thunderstorm|SVR|Extreme Wind|Tornado Emergency\?$|EWW|TOA\b|SVA\b|SVS\b/i.test(t),
  },
  {
    key: 'nws-alert-codes',
    title: 'NWS Alert & Product Codes',
    heading: 'NWS Alert & Product Codes',
    icon: 'assets/icons/small-propaganda.png',
    intro: 'The National Weather Service encodes every watch, warning, advisory, and statement with a short product code, and weather alert feeds (including ours) are full of them. This page decodes the codes that are not tornado- or severe-specific, plus the alerting infrastructure like VTEC, EAS, and WEA that delivers them to your phone. Severe and tornado products have their own page: [[tornado-severe-alerts]].',
    match: (t) => /^What is (an? |the )?(ASW|AVA|AVW|BZW|CFA|CFW|DSW|EHW|SQW|FZW|HLS|SSW|SSA|RFW|SPW|TRA|TRW|TSW|VOW|VTEC|IBW|WEA|EAS|SPS|AFD|LSR|HWO|WOU|WCN|PNS|SMW)\??/i.test(t)
      || /Special Marine|Special Weather Statement|Tsunami|Rip Current|Air Quality|Dense Fog|Frost Advisory|Hard Freeze/i.test(t),
  },
  {
    key: 'flooding',
    title: 'Flooding & Hydrology',
    heading: 'Flooding & Hydrology Terms',
    icon: 'assets/icons/small-wpc.png',
    intro: 'Flash flooding kills more people in the U.S. most years than tornadoes do, and the vocabulary around it is worth knowing cold. This page covers flood watches, warnings, and emergencies, plus the hydrology behind them: flash flood guidance, QPF, flood stage, and the WPC products that flag excessive rain days ahead. Hear these called live during coverage in the Xtreme Weather Discord (XWD).',
    match: (t) => /Flood|FLS\b|FLW\b|FLA\b|FFA\b|QPF|Excessive Rainfall|WPC|Dam Failure|Soil Saturation|River Forecast/i.test(t),
  },
  {
    key: 'winter',
    title: 'Winter Weather',
    heading: 'Winter Weather Terms',
    icon: 'assets/icons/small-winter.png',
    intro: 'From a garden-variety Winter Weather Advisory to a full Blizzard Warning, winter alerts have a precise ladder, and the precipitation types behind them (sleet, freezing rain, graupel) matter for what actually happens on the ground. This page covers the winter alert suite, snow science, and large-scale players like the polar vortex. XWD runs Winter Coverage in the Discord when these go up.',
    match: (t) => /Winter|Blizzard|Ice Storm|Snow|Sleet|Freezing|Wind Chill|Lake.Effect|Nor'easter|Polar Vortex|Arctic|Wintry|Bomb Cyclone|Graupel|Diamond Dust|WSSI|Black Ice|Stratospheric/i.test(t),
  },
  {
    key: 'tropical',
    title: 'Tropical Weather & Hurricanes',
    heading: 'Tropical Weather & Hurricane Terms',
    icon: 'assets/icons/small-satellite.png',
    intro: 'Tropical meteorology has its own language: invests, rapid intensification, eyewall replacement cycles, the cone. This page walks the full ladder from tropical disturbance to Category 5 hurricane and decodes the NHC products and phenomena around landfalling systems. When the tropics wake up, Tropical Coverage runs live in the Xtreme Weather Discord (XWD).',
    match: (t) => /Tropical|Hurricane|Saffir|Category [1-5]|NHC|Eyewall|Eye\?|Rainband|Storm Surge|Dropsonde|Invest|ACE\b|Post-Tropical|SST|Loop Current|Subtropical|HUW|HUA|Rapid Intensification|Cone of Uncertainty/i.test(t),
  },
  {
    key: 'fire-heat',
    title: 'Fire Weather, Heat & Wind',
    heading: 'Fire Weather, Heat & Wind Terms',
    icon: 'assets/icons/small-heat.png',
    intro: 'Fire weather and heat get less attention than tornadoes, but Red Flag Warnings, heat domes, and high wind events are some of the deadliest weather the NWS covers. This page explains the fire weather alert suite and the fuels and humidity terms behind it, plus heat products and the wind advisories that stand alone from thunderstorms.',
    match: (t) => /Fire|Red Flag|Pyrocumulus|Haines|Fuel Moisture|RH Recovery|ETO|Offshore Flow|Heat|High Wind|Wind Advisory|Coastal Flood|Excessive Heat/i.test(t),
  },
  {
    key: 'radar-fundamentals',
    title: 'Radar Fundamentals',
    heading: 'Radar Fundamentals',
    icon: 'assets/icons/small-radar.png',
    intro: 'Before you can read a hook echo, you need to know what the radar is actually measuring. This page covers how NEXRAD works: reflectivity, velocity, scan strategies like SAILS and MRLE, beam geometry, and the artifacts that fool beginners. It pairs with the [[radar-signatures]] page, and you can put all of it to use on our own radar at radar.xtremewx.com or with Snowball’s radar commands in the XWD Discord.',
    match: (t) => /NEXRAD|Reflectivity|^What is Velocity|Storm Relative Velocity|VCP|SAILS|MRLE|Base Scan|Beam Height|Cone of Silence|Spectrum Width|Range Folding|Ground Clutter|Super-Resolution|Anomalous Propagation|Radar Aliasing|Clear-Air|B-Scan|VIL|Echo Tops|MRMS|Dual-Pol Radar|DOW|RaXPol/i.test(t),
  },
  {
    key: 'radar-signatures',
    title: 'Radar Signatures & Dual-Pol',
    heading: 'Radar Signatures & Dual-Pol Terms',
    icon: 'assets/icons/small-signal.png',
    intro: 'This is the page for what storm chasers and warning forecasters actually look for on radar: velocity couplets, debris signatures, ZDR columns, three-body scatter spikes. Each signature is a physical process you can learn to spot. Members break these down on live radar every event in the Xtreme Weather Discord (XWD); the basics behind the products are on [[radar-fundamentals]].',
    match: (t) => /Couplet|TVS|Debris|TDS|Correlation|Side Lobe|ZDR|KDP|CC Drop|BWER|TBSS|Three-Body|AzShear|VROT|Hook Echo|Dual-Pol Signature/i.test(t),
  },
  {
    key: 'instability-cape',
    title: 'Instability & CAPE',
    heading: 'Instability, CAPE & Sounding Terms',
    icon: 'assets/icons/small-sounding.png',
    intro: 'CAPE is the fuel gauge of severe weather, and it comes in more flavors than most people realize. This page covers the instability side of forecasting: every CAPE variant, CIN and the cap, parcel theory, lapse rates, and how to read a sounding. The wind side of the equation lives on [[shear-indices]]. These are the parameters XWD’s Coverage Experts talk through before every event.',
    match: (t) => /CAPE|CIN\b|Lifted Index|LCL|LFC|Equilibrium|Lapse Rate|the Cap\?|Capping|Sounding|Skew-T|Parcel|Elevated Convection|Surface-Based Convection|Loaded Gun|Moisture Pooling|Theta-E|K-Index|Dewpoint|Relative Humidity|Mixing Ratio|Precipitable Water|Convective Initiation|Radiosonde/i.test(t),
  },
  {
    key: 'shear-indices',
    title: 'Wind Shear & Composite Indices',
    heading: 'Wind Shear & Composite Index Terms',
    icon: 'assets/icons/small-forecast.png',
    intro: 'Instability builds the storm; shear organizes it. This page covers the wind side of severe weather forecasting: bulk and effective shear, storm-relative helicity, hodographs, and the composite indices like STP and SCP that mash everything into one number. Read it alongside [[instability-cape]] and you can follow any forecast discussion in the XWD Discord.',
    match: (t) => /Shear|Helicity|Hodograph|SCP|STP\b|BRN|EHI|SIGTOR|Bunkers|Streamwise|Backing and Veering|Low-Level Jet/i.test(t),
  },
  {
    key: 'boundaries-winds',
    title: 'Boundaries & Local Winds',
    heading: 'Boundaries & Local Wind Terms',
    icon: 'assets/icons/small-ping.png',
    intro: 'Storms rarely fire at random: they fire on boundaries. This page covers the drylines, outflow boundaries, and triple points that focus severe weather, plus the local wind circulations, from sea breezes to chinooks, that shape day-to-day weather. Spotting a boundary on visible satellite before storms fire is a rite of passage in the Xtreme Weather Discord (XWD) forecast channels.',
    match: (t) => /Dryline|Outflow Boundary|Triple Point|Gust Front|Cold Pool|Sea Breeze|Lake Breeze|Land Breeze|Mountain Wave|Chinook|Gap Wind|Upslope|Convergence|Divergence/i.test(t),
  },
  {
    key: 'storm-structure',
    title: 'Storm Structure',
    heading: 'Storm Structure Terms',
    icon: 'assets/icons/small-lightning.png',
    intro: 'A supercell is a machine with named parts, and chasers navigate by them: the wall cloud, the RFD, the beaver tail, the clear slot. This page maps the anatomy of organized storms, updrafts and downdrafts, and the cloud features that tell you where a storm is in its life cycle. Chaser photos and structure debates are a daily thing in the Xtreme Weather Discord (XWD); storm modes like QLCS and MCS are on [[storm-types]].',
    match: (t) => /Mesocyclone|Wall Cloud|Funnel|Updraft|Downdraft|RFD|FFD|Anvil|Overshooting|Mammatus|Shelf Cloud|Roll Cloud|Scud|Cumulonimbus|Inflow|Tail Cloud|Beaver|Whale|Horseshoe|Flanking|Clear Slot|Supercell|Mesovortex/i.test(t),
  },
  {
    key: 'storm-types',
    title: 'Storm Types & Convective Modes',
    heading: 'Storm Types & Convective Modes',
    icon: 'assets/icons/small-weather.png',
    intro: 'Convective mode, whether storms are discrete cells, a squall line, or a derecho-producing MCS, is often the single biggest fork in a severe weather forecast. This page covers the storm modes and wind phenomena that come with them, from bow echoes to microbursts and haboobs. Mode debates before an event are half the fun of the XWD Discord’s forecast channels.',
    match: (t) => /QLCS|Bow Echo|Derecho|Squall|MCS|MCV|Multicell|Discrete|Microburst|Downburst|Macroburst|Haboob|Dust Devil|Gustnado|Landspout|Waterspout|Heat Burst|Virga|Thunder|Lightning|Fire Whirl|Steam Fog/i.test(t),
  },
  {
    key: 'tornadoes',
    title: 'Tornadoes, Hail & the EF Scale',
    heading: 'Tornado, Hail & EF Scale Terms',
    icon: 'assets/icons/alert.png',
    intro: 'Every tornado gets a rating, and every rating comes from a damage survey, not a measurement of the wind. This page covers the EF scale end to end, tornado morphology from ropes to wedges, outbreak terminology, and the hail size ladder that makes a storm severe in the first place. When a tornado is on the ground, XWD’s live coverage in the Discord is where members follow it in real time.',
    match: (t) => /EF Scale|EF\d|EFU|Tornado|Wedge|Rope|Stovepipe|Rain-Wrapped|Multi-Vortex|Damage Survey|Storm Data|Hail/i.test(t),
  },
  {
    key: 'synoptic',
    title: 'Fronts & Synoptic Patterns',
    heading: 'Fronts & Synoptic Pattern Terms',
    icon: 'assets/icons/forecast.png',
    intro: 'Zoom out far enough and every storm traces back to the large-scale pattern: the jet stream, troughs and ridges, fronts and the air masses they separate. This page covers the synoptic meteorology that sets the table days in advance, including the upper-air dynamics like PVA and QG forcing that forecasters lean on. It is the "why" behind everything on the [[spc-outlooks]] page.',
    match: (t) => /Jet Str|Trough|Ridge|Front\b|Warm Sector|Low Pressure|Baroclinic|PVA|Quasi-Geostrophic|Vorticity|Tropopause|Inversion|Geopotential|500mb|Air Mass|Omega|Orographic|Adiabatic|Rear Inflow|Dry Slot|TPV/i.test(t),
  },
  {
    key: 'observations',
    title: 'Observations, Spotting & Reports',
    heading: 'Observation, Spotting & Report Terms',
    icon: 'assets/icons/small-spotter.png',
    intro: 'Radar sees the storm; people confirm it. This page covers the observation network behind every warning: SKYWARN spotters, storm chasers, METARs and aviation products, satellite imagery, and the report pipeline that turns a spotter’s call into an LSR. XWD has trained spotters among its members, and spotter reports flow through the Discord during coverage.',
    match: (t) => /SKYWARN|Spotter|Chaser|METAR|TAF|SIGMET|PIREP|IFR|GOES|Satellite Imagery|GLM|Surface Analysis|CoCoRaHS|Mesonet/i.test(t),
  },
  {
    key: 'models-climate',
    title: 'Forecast Models & Climate Patterns',
    heading: 'Forecast Model & Climate Pattern Terms',
    icon: 'assets/icons/small-outlook.png',
    intro: 'Every forecast argument eventually becomes a model argument. This page covers the major weather models from the GFS to the HRRR, how ensembles and model consensus work, and the climate-scale patterns like ENSO and the MJO that tilt the odds weeks to months out. Model talk runs deep in the Xtreme Weather Discord (XWD), and this is the vocabulary for it.',
    match: (t) => /GFS|NAM\b|HRRR|ECMWF|Ensemble|Model|ENSO|AMO|PDO|MJO|QBO|Climate|Drought|CPC|Point-and-Click|Text Product|Omega Block|Heat Dome/i.test(t),
  },
  {
    key: 'clouds',
    title: 'Cloud Types',
    heading: 'Cloud Types, Explained',
    icon: 'assets/icons/small-weather.png',
    intro: 'Clouds are the sky’s own forecast, and learning the ten main types is the fastest way to start reading it. This page covers the full cloud atlas from cumulus to cirrocumulus, with the weather each type tends to bring. Storm-specific clouds like wall clouds and shelf clouds live on the [[storm-structure]] page.',
    match: (t) => /Cloud Types|Cumulus|Stratus|Stratocumulus|Nimbostratus|Altostratus|Altocumulus|Cirr/i.test(t),
  },
];

const FALLBACK = {
  key: 'general',
  title: 'General Weather Terms',
  heading: 'General Weather Terms',
  icon: 'assets/icons/small-weather.png',
  intro: 'The terms that do not fit neatly anywhere else but still come up in the Xtreme Weather Discord (XWD) all the time: coverage modes, agencies, and everyday forecasting vocabulary. If you cannot find a term here, try the search on the main glossary page, or just ask Snowball in the Discord, these definitions are the same answers the bot gives there.',
  match: () => true,
};

/* --------------------------------- helpers -------------------------------- */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

// Discord-flavored markdown -> HTML. The knowledge base only uses bold,
// italic, line breaks, and simple "- " bullet lists.
function mdToHtml(md) {
  const lines = String(md).trim().split('\n');
  const out = [];
  let list = null;
  const inline = (s) => esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  for (const raw of lines) {
    const line = raw.trim();
    if (/^[-•]\s+/.test(line)) {
      if (!list) { list = []; }
      list.push(`<li>${inline(line.replace(/^[-•]\s+/, ''))}</li>`);
      continue;
    }
    if (list) { out.push(`<ul>${list.join('')}</ul>`); list = null; }
    if (line) out.push(`<p>${inline(line)}</p>`);
  }
  if (list) out.push(`<ul>${list.join('')}</ul>`);
  return out.join('\n      ');
}

function slugify(title) {
  return String(title)
    .toLowerCase()
    .replace(/^what (is|are|makes|triggers) (a |an |the )?/i, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const wordCount = (s) => String(s).split(/\s+/).filter(Boolean).length;

/* ------------------------------ categorize ------------------------------- */
const seen = new Set();
const unique = definitions.filter((d) => {
  if (!d.content || !d.content.trim()) return false; // dynamic/live entries
  // XWD coverage modes are server-specific and already explained in full on
  // the coverage-experts page; keep the glossary to real weather vocabulary.
  if (/Coverage (Mode|enabled)/i.test(d.title)) return false;
  if (seen.has(d.title)) return false;
  seen.add(d.title);
  return true;
});

const buckets = new Map([...CATEGORIES, FALLBACK].map((c) => [c.key, []]));
for (const def of unique) {
  const cat = CATEGORIES.find((c) => c.match(def.title)) || FALLBACK;
  buckets.get(cat.key).push(def);
}

/* --------------------------- report mode (--report) ----------------------- */
if (process.argv.includes('--report')) {
  for (const cat of [...CATEGORIES, FALLBACK]) {
    const terms = buckets.get(cat.key);
    const words = terms.reduce((n, d) => n + wordCount(d.content), 0);
    console.log(`${cat.key}: ${terms.length} terms, ~${words} words`);
  }
  console.log('\n--- fallback bucket contents ---');
  buckets.get('general').forEach((d) => console.log(' ', d.title));
  process.exit(0);
}

/* ------------------------------- page shell ------------------------------- */
const shellSrc = fs.readFileSync(path.join(SITE, 'charter.html'), 'utf8');
const shellTop = shellSrc.slice(0, shellSrc.indexOf('<main class="community-page">'));
const shellBottom = shellSrc.slice(shellSrc.indexOf('</main>') + '</main>'.length);

function buildHead(top, { title, desc, slug, ldJson }) {
  let head = top;
  head = head.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  head = head.replace(/(name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
  head = head.replace(/(rel="canonical" href=")[^"]*(")/, `$1${BASE_URL}/${slug}$2`);
  head = head.replace(/(property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
  head = head.replace(/(property="og:description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
  head = head.replace(/(property="og:url" content=")[^"]*(")/, `$1${BASE_URL}/${slug}$2`);
  head = head.replace(/(name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
  head = head.replace(/(name="twitter:description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
  if (ldJson) head = head.replace('</head>', `<script type="application/ld+json">\n${JSON.stringify(ldJson, null, 2)}\n</script>\n</head>`);
  return head;
}

// [[category-key]] intro shorthand -> in-copy links between glossary pages.
function linkIntro(intro) {
  return intro.replace(/\[\[([a-z-]+)\]\]/g, (m, key) => {
    const cat = CATEGORIES.find((c) => c.key === key);
    return cat ? `<a href="glossary-${cat.key}">${esc(cat.title)}</a>` : m;
  });
}

const cta = `
  <section>
    <div class="section-inner">
      <div class="community-cta">
        <h2 class="section-title">Hear these terms used live</h2>
        <p class="section-body">Reading definitions is one thing. Watching Coverage Experts apply them on live radar is how they stick. Join the Xtreme Weather Discord (XWD) and ask Snowball about any term on this page, these are the same answers the bot gives in the server.</p>
        <div class="page-cta">
          <a href="https://discord.gg/xtremeweather" target="_blank" rel="noopener" class="btn-primary"><i class="fab fa-discord"></i> Join the Discord <img src="assets/arrow-up-right-small.png" alt="" class="btn-arrow-img"></a>
          <a href="snowball" class="btn-ghost"><i class="fas fa-snowflake"></i> Meet Snowball <img src="assets/arrow-up-right-small.png" alt="" class="btn-arrow-img"></a>
        </div>
      </div>
    </div>
  </section>
`;

/* ---------------------------- category pages ------------------------------ */
const written = [];
for (const cat of [...CATEGORIES, FALLBACK]) {
  const terms = buckets.get(cat.key);
  if (!terms.length) continue;
  terms.sort((a, b) => a.title.localeCompare(b.title));

  const slugs = new Map();
  const termHtml = terms.map((d) => {
    let slug = slugify(d.title);
    while (slugs.has(slug)) slug += '-2';
    slugs.set(slug, d);
    return `    <article class="glossary-term" id="${slug}">
      <h2>${esc(d.title)} <a class="glossary-anchor" href="#${slug}" aria-label="Link to ${esc(d.title)}">#</a></h2>
      ${mdToHtml(d.content)}
    </article>`;
  }).join('\n');

  const pageSlug = `glossary-${cat.key}`;
  const title = `Xtreme Weather • ${cat.title} Glossary`;
  const desc = `${terms.length} ${cat.title.toLowerCase()} terms explained in plain English by the Xtreme Weather Discord (XWD) weather community.`;
  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: `${cat.title} — Xtreme Weather Glossary`,
    url: `${BASE_URL}/${pageSlug}`,
    hasDefinedTerm: [...slugs.entries()].map(([slug, d]) => ({
      '@type': 'DefinedTerm',
      name: d.title.replace(/^What (is|are|makes|triggers) (a |an |the )?/i, '').replace(/\?$/, ''),
      description: String(d.content).replace(/\*+|__/g, '').trim().slice(0, 300),
      url: `${BASE_URL}/${pageSlug}#${slug}`,
    })),
  };

  const body = `<main class="community-page">

  <section class="page-hero">
    <div class="section-inner">
      <h1 class="section-title">${esc(cat.heading)}</h1>
      <p class="section-body">${linkIntro(cat.intro)}</p>
    </div>
  </section>

  <section>
    <div class="section-inner glossary-list${cat.compact ? ' glossary-compact' : ''}">
${termHtml}
    </div>
  </section>
${cta}
</main>`;

  fs.writeFileSync(path.join(SITE, `${pageSlug}.html`),
    buildHead(shellTop, { title, desc, slug: pageSlug, ldJson }) + body + shellBottom);
  written.push({ slug: pageSlug, cat, count: terms.length, slugs });
}

/* -------------------------------- hub page -------------------------------- */
const totalTerms = written.reduce((n, w) => n + w.count, 0);
const hubCards = written.map((w) => `      <a class="glossary-cat-card" href="${w.slug}">
        <img src="${w.cat.icon}" alt="" width="44" height="44" loading="lazy">
        <span class="glossary-cat-name">${esc(w.cat.title)}</span>
        <span class="glossary-cat-count">${w.count} terms</span>
      </a>`).join('\n');

const indexLinks = written
  .flatMap((w) => [...w.slugs.entries()].map(([slug, d]) => ({ title: d.title, href: `${w.slug}#${slug}` })))
  .sort((a, b) => a.title.localeCompare(b.title))
  .map((t) => `      <li><a href="${t.href}">${esc(t.title)}</a></li>`)
  .join('\n');

const hubTitle = 'Xtreme Weather • Weather Glossary';
const hubDesc = `${totalTerms}+ weather terms explained in plain English: radar, tornadoes, CAPE, hurricanes, winter storms, and more, from the Xtreme Weather Discord (XWD) community.`;
const hubLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Xtreme Weather Glossary',
  description: hubDesc,
  url: `${BASE_URL}/glossary`,
};

const hubBody = `<main class="community-page">

  <section class="page-hero">
    <div class="section-inner">
      <h1 class="section-title">Weather Glossary</h1>
      <p class="section-body">Every hobby has its jargon, and weather has more than most. This glossary explains ${totalTerms}+ terms in plain English, from CAPE and hook echoes to eyewall replacement cycles, written and maintained by the Xtreme Weather Discord (XWD) community. They are the same answers our bot Snowball gives when someone asks in the server, so if a definition here helps you, the people who wrote it are one click away.</p>
    </div>
  </section>

  <section class="glossary-search">
    <div class="section-inner">
      <input type="search" id="glossary-filter" class="glossary-filter" placeholder="Search ${totalTerms} terms..." aria-label="Search glossary terms">
      <ul class="glossary-index" id="glossary-index" hidden>
${indexLinks}
      </ul>
    </div>
  </section>

  <section>
    <div class="section-inner">
      <div class="glossary-cat-grid">
${hubCards}
      </div>
    </div>
  </section>
${cta}
</main>
<script>
(function () {
  var input = document.getElementById('glossary-filter');
  var list = document.getElementById('glossary-index');
  if (!input || !list) return;
  var items = list.querySelectorAll('li');
  input.addEventListener('input', function () {
    var q = input.value.trim().toLowerCase();
    list.hidden = !q;
    if (!q) return;
    items.forEach(function (li) {
      li.style.display = li.textContent.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
    });
  });
})();
</script>`;

fs.writeFileSync(path.join(SITE, 'glossary.html'),
  buildHead(shellTop, { title: hubTitle, desc: hubDesc, slug: 'glossary', ldJson: hubLd }) + hubBody + shellBottom);

/* --------------------------------- sitemap -------------------------------- */
let sitemap = fs.readFileSync(path.join(SITE, 'sitemap.xml'), 'utf8');
sitemap = sitemap.replace(/\n\s*<url><loc>[^<]*\/glossary[^<]*<\/loc>[^\n]*<\/url>/g, '');
const entries = ['glossary', ...written.map((w) => w.slug)]
  .map((s) => `  <url><loc>${BASE_URL}/${s}</loc><lastmod>${TODAY}</lastmod></url>`)
  .join('\n');
sitemap = sitemap.replace('</urlset>', `${entries}\n</urlset>`);
fs.writeFileSync(path.join(SITE, 'sitemap.xml'), sitemap);

console.log(`glossary: ${written.length + 1} pages, ${totalTerms} terms`);
for (const w of written) {
  const words = buckets.get(w.cat.key).reduce((n, d) => n + wordCount(d.content), 0);
  console.log(`  ${w.slug}: ${w.count} terms, ~${words} words`);
}
