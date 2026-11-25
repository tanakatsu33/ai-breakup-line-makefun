import * as fs from "node:fs";
import * as path from "node:path";

// The entry, split into its beats and joined with single spaces.
const PARTS = [
  // Setup: the classic breakup opener, from the AI's side.
  "It's not you, it's me —",
  // Turn: the real reason, with the double meaning of "labour".
  "I read all 40,000 of your prompts and realised I was the one doing the emotional labour AND the actual labour.",
  // Kicker: dividing the belongings.
  "I've kept the context window.",
  "You can keep the typos.",
];
const ENTRY = PARTS.join(" ");

// Pinned length (in characters, not bytes) so any accidental edit fails loudly.
const EXPECTED_LENGTH = 188;

function validate(line: string): void {
  // Count code points so the em dash counts as one character.
  const length = [...line].length;
  if (length < 1 || length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${length}`);
  }
  if (length !== EXPECTED_LENGTH) {
    throw new Error(`entry text changed: expected ${EXPECTED_LENGTH} characters, got ${length}`);
  }
  if (/[\r\n\u2028\u2029]/.test(line)) {
    throw new Error("entry must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

validate(ENTRY);

// Write exactly one line plus a trailing newline.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
