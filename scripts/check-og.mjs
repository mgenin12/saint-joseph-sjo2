#!/usr/bin/env node
/**
 * Vérifie les balises Open Graph / Twitter d'une ou plusieurs URL.
 *   node scripts/check-og.mjs https://saint-joseph-sjo2.vercel.app/ https://…/articles/le-terrain
 * Sans argument : teste les pages principales de SITE_URL (défaut http://localhost:3000).
 * Code de sortie 1 si une balise essentielle manque.
 */
const base = (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const urls = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["/", "/articles", "/articles/le-terrain", "/soutenir", "/calendrier", "/newsletter"].map((p) => base + p);

const REQUIRED = ["og:title", "og:description", "og:image", "og:url", "og:type", "twitter:card"];

function metas(html) {
  const out = {};
  const re = /<meta\s+[^>]*?(?:property|name)=["']([^"']+)["'][^>]*?content=["']([^"']*)["'][^>]*>/gi;
  const re2 = /<meta\s+[^>]*?content=["']([^"']*)["'][^>]*?(?:property|name)=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = re.exec(html))) out[m[1]] = out[m[1]] ?? m[2];
  while ((m = re2.exec(html))) out[m[2]] = out[m[2]] ?? m[1];
  return out;
}

let failed = false;
for (const url of urls) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "facebookexternalhit/1.1" } });
    const html = await res.text();
    const m = metas(html);
    const missing = REQUIRED.filter((k) => !m[k]);
    const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] ?? "";
    console.log(`\n${res.status} ${url}`);
    console.log(`  title        : ${title}`);
    for (const k of ["og:title", "og:description", "og:image", "og:url", "og:type", "twitter:card", "twitter:image"]) {
      console.log(`  ${k.padEnd(13)}: ${m[k] ?? "—"}`);
    }
    if (m["og:image"]) {
      const img = await fetch(m["og:image"], { method: "GET" });
      console.log(`  image status : ${img.status} ${img.headers.get("content-type") ?? ""}`);
      if (!img.ok) failed = true;
    }
    if (missing.length) {
      failed = true;
      console.log(`  ✗ manquant   : ${missing.join(", ")}`);
    } else {
      console.log("  ✓ Open Graph complet");
    }
  } catch (err) {
    failed = true;
    console.log(`\n✗ ${url} : ${err.message}`);
  }
}
process.exit(failed ? 1 : 0);
