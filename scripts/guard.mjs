#!/usr/bin/env node
// Refuse to publish a release note that leaks.
//
//   node scripts/guard.mjs CHANGELOG.md [more files...]
//
// Exit 1 on anything in the block list. Exit 0 with warnings on judgement
// calls, so a release is never held up by a number that happens to be public.

import { readFileSync } from "node:fs";
import { scan, summarise, BLOCK } from "./rules.mjs";

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("usage: node scripts/guard.mjs <file...>");
  process.exit(2);
}

let failed = false;

for (const file of files) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    console.error(`cannot read ${file}`);
    failed = true;
    continue;
  }

  const findings = scan(text);
  const { blocked, reviewed } = summarise(findings);

  for (const f of blocked) {
    failed = true;
    console.error(`${file}:${f.line}  [${f.rule}]  ${JSON.stringify(f.match)}`);
    console.error(`    ${f.why}`);
    console.error(`    fix: ${f.hint}`);
    console.error(`    line: ${f.context.slice(0, 160)}`);
  }

  for (const f of reviewed) {
    console.warn(`${file}:${f.line}  [${f.rule}] check  ${JSON.stringify(f.match)}`);
    console.warn(`    ${f.why}`);
  }

  if (blocked.length === 0) {
    console.log(`${file}: ok${reviewed.length ? ` (${reviewed.length} to check)` : ""}`);
  }
}

if (failed) {
  console.error("");
  console.error("Refusing to publish. Fix the lines above, or if a line is genuinely");
  console.error("public, rewrite it so it says the same thing without the detail.");
  process.exit(1);
}
