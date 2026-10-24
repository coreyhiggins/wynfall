A release note has one job: tell someone who already uses the app what changed for them.

## Write it for the person using it

Lead with the outcome, not the implementation.

- Good: "A long run is no longer cut off after three minutes."
- Weak: "Refactored the run timeout constant to read from config."

If a release has one theme, put it in a bold line above the bullets. If it does not, skip the line. Most releases do not have one.

## Keep out

These must never appear in a public note:

- Vendor names, model vendors, or checkpoint names
- Internal host names, machine names, or IP addresses
- Repository paths from private code, issue numbers, or PR numbers
- Anything about training data, weights, or how the pipeline works
- Pricing that has not been published
- Customer names

Repo issue and PR numbers normalize to `(#123)` in the private changelog. Strip them here.

## Format

```markdown
## 1.2.3

**One bold line, only if the release has a theme.**

- What changed, in the tense of what it does now.
- Another change. One idea per bullet.
```

Order versions newest first. The workflow in this repository fails the build if they are not.

## Translate the internal changelog

The private changelog is written for engineers. Do not paste it. For each line, answer: what does the person notice?

| Private line | Public line |
|---|---|
| `Compaction between rounds` | Context is compacted between rounds instead of ending the turn. |
| `REA for founder, admin and security accounts (#464)` | Internal access control. Omit entirely. |
| `Steering works during ChatGPT plan and Muse replies (#460)` | You can steer a reply while it is still being written. |

When in doubt, leave it out. A short honest note beats a complete one that leaks.
