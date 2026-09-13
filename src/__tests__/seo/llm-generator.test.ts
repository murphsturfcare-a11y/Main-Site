import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';

// Exercise the actual generator conversion through Node without duplicating it.
describe('optional text exports', () => {
  it('preserves ordered-list content and resolves canonical links', () => {
    const code = `import { htmlToMarkdown } from './scripts/generate-llm-files.mjs';
      console.log(htmlToMarkdown('<ol><li>Remove debris</li><li>Rinse gently</li></ol><p><a href="/locations/palm-desert">Palm Desert</a></p>'));`;
    const markdown = execFileSync(process.execPath, ['--input-type=module', '-e', code], { encoding: 'utf8' });
    expect(markdown).toContain('1. Remove debris');
    expect(markdown).toContain('2. Rinse gently');
    expect(markdown).toContain('[Palm Desert](https://murphysturf.com/locations/palm-desert)');
    expect(markdown).not.toContain('$1');
  });
});
