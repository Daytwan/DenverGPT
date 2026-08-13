import { spawn } from 'node:child_process'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const isWindows = process.platform === 'win32'
const executable = resolve(root, 'node_modules', '.bin', isWindows ? 'playwright.cmd' : 'playwright')
const environment = { ...process.env }

// Some agent and CI runners export both variables, which makes Node emit a
// warning before every Playwright worker. Let Playwright choose one policy.
delete environment.FORCE_COLOR
delete environment.NO_COLOR

const child = spawn(executable, ['test', ...process.argv.slice(2)], {
  cwd: root,
  env: environment,
  shell: isWindows,
  stdio: 'inherit',
})

const exitCode = await new Promise((resolvePromise, rejectPromise) => {
  child.once('error', rejectPromise)
  child.once('exit', (code) => resolvePromise(code ?? 1))
})

process.exitCode = exitCode
