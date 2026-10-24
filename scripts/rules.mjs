// One rule set, used by both the guard (blocks) and the redactor (rewrites).
// Keeping them in one file is the point: a rule added here can never drift
// between what we check and what we scrub.

export const BLOCK = "block";
export const REVIEW = "review";

// Sigel is public. The rest are house names that do not appear in public copy.
const INTERNAL_MODELS = ["Ken", "Glyph", "Nova"];

export const RULES = [
  {
    id: "issue-ref",
    severity: BLOCK,
    // (#123) style project issue links.
    pattern: /\(#\d+\)/g,
    why: "Issue numbers point at private project history.",
    hint: "Delete the reference. The reader does not need it.",
  },
  {
    id: "issue-hash",
    severity: BLOCK,
    pattern: /(^|\s)#\d{2,}\b/g,
    why: "Bare issue or PR numbers lead back to the private tracker.",
    hint: "Delete the number.",
  },
  {
    id: "internal-model",
    severity: BLOCK,
    pattern: new RegExp(`\\b(${INTERNAL_MODELS.join("|")})\\b`, "g"),
    why: "Only Sigel is announced publicly. The other names are unreleased.",
    hint: "Replace with 'the model' or 'models'.",
  },
  {
    id: "vendor",
    severity: BLOCK,
    pattern:
      /\b(OpenAI|Anthropic|Claude|ChatGPT|GPT-?\d|DeepSeek|Gemini|Llama|Mistral|Qwen|vLLM|Hugging ?Face|Codex|Copilot)\b/gi,
    why: "Naming a vendor or checkpoint breaks the public rule and dates the note.",
    hint: "Say what the capability is, not whose model provided it.",
  },
  {
    id: "internal-acronym",
    severity: BLOCK,
    pattern: /\bREA\b/g,
    why: "Internal feature shortcut. Means nothing outside the company.",
    hint: "Drop the line unless the behavior is user-visible, then describe the behavior.",
  },
  {
    id: "private-repo",
    severity: BLOCK,
    pattern:
      /\b(wynfall-harness|wynfall-local-engine|wynfall-security|wynfall-benchmark|wynfall-strategy|wynfall-crane|wynfall-chat)\b/gi,
    why: "Names the private repository layout.",
    hint: "Say 'the app' or 'the service'.",
  },
  {
    id: "infra-path",
    severity: BLOCK,
    pattern: /(^|[\s`("'])([A-Za-z]:\\|\/srv\/|~\/\.wynfall|\.claude\/|worktrees\/)/g,
    why: "Absolute paths leak machine layout and deployment shape.",
    hint: "Describe the folder in words, or drop it.",
  },
  {
    id: "secret-var",
    severity: BLOCK,
    pattern: /\b(TOKEN|SECRET|PAT|JWT|SIG|PRIVATE_KEY|API_KEY)\b/g,
    why: "Naming the exact variables in a security allowlist is method disclosure.",
    hint: "Say 'credentials and secret-shaped values' and stop there.",
  },
  {
    id: "server-internals",
    severity: BLOCK,
    pattern: /\b(VPS|systemd|ssh\b|compose file|container|reverse proxy|Cloudflare Tunnel)\b/gi,
    why: "Hosting internals. No reader needs this and it maps the deployment.",
    hint: "Say 'our servers' or omit.",
  },
  {
    id: "secret-shape",
    severity: BLOCK,
    pattern: /(sk-[A-Za-z0-9]{16,}|ghp_[A-Za-z0-9]{16,}|github_pat_[A-Za-z0-9_]{16,}|wf_[A-Za-z0-9]{16,})/g,
    why: "This is an actual credential.",
    hint: "Remove immediately and rotate it.",
  },

  // ---- judgement calls: flagged for a person, not auto-blocked ----
  {
    id: "eval-metric",
    severity: REVIEW,
    pattern: /\b\d{1,3}%\s*(to|->|→)\s*\d{1,3}%|\b\d{1,3}% of samples\b|\beval\b/gi,
    why: "Internal eval numbers are a method signal. They also invite a benchmark fight.",
    hint: "Drop the number, or keep it only if it is published on the site.",
  },
  {
    id: "hardware",
    severity: REVIEW,
    pattern: /\b(GH200|3090|4090|A100|H100|RunPod|Lambda)\b/g,
    why: "Hardware is already public on the profile. Fine to keep if you mean it.",
    hint: "Keep only where it is a deliberate brag, never as an explanation of how it works.",
  },
  {
    id: "source-file",
    severity: REVIEW,
    pattern: /`[^`]*\.(mjs|ts|tsx|js|py|rs|go|java|css|json)`/g,
    why: "Naming a source file hints at structure.",
    hint: "Say what the thing does instead.",
  },
  {
    id: "metric-count",
    severity: REVIEW,
    pattern: /\b\d+\s*(tool steps|rounds|tokens|messages|hours)\b/gi,
    why: "Concrete limits are usually a product fact and worth keeping, but confirm it is a published number.",
    hint: "Cross-check against the pricing page before publishing.",
  },
];

export function scan(text) {
  const findings = [];
  for (const rule of RULES) {
    const re = new RegExp(rule.pattern.source, rule.pattern.flags);
    let m;
    while ((m = re.exec(text)) !== null) {
      if (m[0].length === 0) { re.lastIndex++; continue; }
      const before = text.slice(0, m.index);
      const line = before.split("\n").length;
      const lineStart = before.lastIndexOf("\n") + 1;
      const lineEnd = text.indexOf("\n", m.index);
      findings.push({
        rule: rule.id,
        severity: rule.severity,
        match: m[0],
        line,
        context: text.slice(lineStart, lineEnd === -1 ? undefined : lineEnd).trim(),
        why: rule.why,
        hint: rule.hint,
      });
    }
  }
  return findings;
}

export function summarise(findings) {
  const blocked = findings.filter((f) => f.severity === BLOCK);
  const reviewed = findings.filter((f) => f.severity === REVIEW);
  return { blocked, reviewed };
}
