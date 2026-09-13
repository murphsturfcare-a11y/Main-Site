import { readdir } from 'node:fs/promises';
import path from 'node:path';

const privateDirectories = new Set(['.git', '.claude', '.claude-flow', '.codex', '.gstack', '.impeccable']);
const violations = [];

async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (privateDirectories.has(entry.name) || /^\.env(?:\.|$)/.test(entry.name)) {
      violations.push(filename);
    } else if (entry.isDirectory()) {
      await inspect(filename);
    }
  }
}

await inspect('public');
if (violations.length) {
  console.error('Internal tooling or environment files must be moved outside public before building:');
  for (const filename of violations) console.error(`- ${filename}`);
  process.exitCode = 1;
} else {
  console.log('Public-file check passed.');
}
