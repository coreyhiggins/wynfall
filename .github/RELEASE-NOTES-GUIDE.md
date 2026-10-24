# How a release note gets written

Release notes are written by a person from the private log, not generated from it. The private log is a work record: it names files, issue numbers, internal flags, vendors, and hardware. Public notes describe the outcome and stop there.

## The one rule

**Say what the user can now do. Do not say how it was built, or where the idea came from.**

If a sentence would help a competitor, it does not belong. If it only helps the person holding the app, it does.

## Three levels of detail

| Level | Example | Publish? |
|---|---|---|
| Outcome | A long task is no longer cut off partway through. | Yes |
| Limit | A turn can now run far longer before it has to stop, and you can extend it. | Yes, if the exact number is visible in the app |
| Mechanism | Compaction runs between rounds so the context window does not overflow. | No |

Mechanism is what leaks. The reader asked for the first row. Give them the first row.

## Never publish

These are enforced by `scripts/guard.mjs`. Do not work around it by rewording just enough to pass.

- Issue and pull request numbers. They point at private project history.
- Internal feature flags and shortcuts, such as a switch that only staff see.
- The names of any model other than Sigel. Unreleased names are roadmap.
- Vendors, providers, or checkpoints. Capability, not provenance.
- The allowlist or denylist for environment variables. That is a map of the defense.
- Hosting shape: how many machines, what runs on them, how they are reached.
- Eval scores and internal benchmark numbers. If a number is not on the pricing page or the site, it is not ours to publish.
- Absolute paths, source file names, and repository names.
- Anything that reads as a security posture: what is blocked, what is trusted, what is logged.

## Say it plainly or cut it

- Lead with the outcome in the first four words.
- Past tense for what changed, present tense for what it now does.
- No "we are excited". No "seamless". No "robust". No "leverage".
- One idea per bullet. If a bullet needs a semicolon chain, it is two bullets or none.
- A short honest note beats a complete one that leaks.

## Check before pushing

```bash
node scripts/guard.mjs CHANGELOG.md
```

Exit 1 means something in the block list is present. Fix the line by removing the detail, not by rewording it to slip past. Exit 0 with warnings means a person should look at each one.

## Where the numbers come from

Only two places, ever:

1. The app itself, where a user can see it.
2. `wynfall.dev`, which includes the pricing page.

If the number is not in one of those, it stays internal even when it is flattering.
