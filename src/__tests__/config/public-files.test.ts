import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const script = path.resolve('scripts/check-public-files.mjs');
const fixtures: string[] = [];
function fixture() {
  const directory = mkdtempSync(path.join(tmpdir(), 'murphys-public-check-'));
  fixtures.push(directory);
  mkdirSync(path.join(directory, 'public'));
  return directory;
}
afterEach(() => fixtures.splice(0).forEach((directory) => rmSync(directory, { recursive: true, force: true })));

describe('publishable file boundary', () => {
  it('allows normal media and standards-based .well-known assets', () => {
    const directory = fixture();
    mkdirSync(path.join(directory, 'public/.well-known'));
    writeFileSync(path.join(directory, 'public/.well-known/security.txt'), 'Public contact guidance');
    expect(execFileSync(process.execPath, [script], { cwd: directory, encoding: 'utf8' })).toContain('passed');
  });

  it.each(['images/.claude-flow', 'nested/.env.local'])('blocks nested private material at %s without printing contents', (relativePath) => {
    const directory = fixture();
    const target = path.join(directory, 'public', relativePath);
    mkdirSync(path.dirname(target), { recursive: true });
    if (relativePath.endsWith('.claude-flow')) {
      mkdirSync(target);
      writeFileSync(path.join(target, 'internal.json'), 'PRIVATE_FIXTURE_DO_NOT_PRINT');
    } else {
      writeFileSync(target, 'PRIVATE_FIXTURE_DO_NOT_PRINT');
    }
    const result = spawnSync(process.execPath, [script], { cwd: directory, encoding: 'utf8' });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain(relativePath);
    expect(result.stderr + result.stdout).not.toContain('PRIVATE_FIXTURE_DO_NOT_PRINT');
  });
});
