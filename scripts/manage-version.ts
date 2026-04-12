import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

type BumpType = 'major' | 'minor' | 'patch'

type PackageJSON = {
  version: string
}

const VERSION_REGEX = /^\d+\.\d+\.\d+$/
const VERSION_TS_PATH = 'src/version.ts'
const PACKAGE_JSON_PATH = 'package.json'

function parseVersion(version: string) {
  const parts = version.split('.').map((part) => Number.parseInt(part, 10))
  const [major = 0, minor = 0, patch = 0] = parts
  return { major, minor, patch }
}

function nextVersion(current: string, bump: BumpType) {
  const { major, minor, patch } = parseVersion(current)
  if (bump === 'major') return `${major + 1}.0.0`
  if (bump === 'minor') return `${major}.${minor + 1}.0`
  return `${major}.${minor}.${patch + 1}`
}

function replaceVersionInVersionTS(version: string) {
  const source = readFileSync(VERSION_TS_PATH, 'utf8')
  const updated = source.replace(
    /export const APP_VERSION = '[^']+'/,
    `export const APP_VERSION = '${version}'`,
  )
  if (updated === source)
    throw new Error('Unable to update APP_VERSION in src/version.ts')
  writeFileSync(VERSION_TS_PATH, updated)
}

function updatePackageVersion(version: string) {
  const packageJSON = JSON.parse(
    readFileSync(PACKAGE_JSON_PATH, 'utf8'),
  ) as PackageJSON
  packageJSON.version = version
  writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJSON, null, 2) + '\n')
}

function syncVersionFiles(version: string) {
  if (!VERSION_REGEX.test(version))
    throw new Error(`Invalid version format: ${version}`)
  updatePackageVersion(version)
  replaceVersionInVersionTS(version)
}

function buildDist() {
  execSync('bun src/build.ts', { stdio: 'inherit' })
}

const [arg1 = 'patch', arg2] = process.argv.slice(2)
const packageJSON = JSON.parse(readFileSync(PACKAGE_JSON_PATH, 'utf8')) as PackageJSON
const currentVersion = packageJSON.version

if (arg1 === '--sync') {
  syncVersionFiles(currentVersion)
  buildDist()
  console.log(`[version] Synced files and rebuilt dist for ${currentVersion}`)
  process.exit(0)
}

const isBumpType = arg1 === 'major' || arg1 === 'minor' || arg1 === 'patch'
const targetVersion = isBumpType
  ? nextVersion(currentVersion, arg1)
  : arg1 === '--set'
    ? arg2
    : undefined

if (!targetVersion)
  throw new Error(
    'Usage: bun scripts/manage-version.ts [major|minor|patch] | --set <x.y.z> | --sync',
  )

syncVersionFiles(targetVersion)
buildDist()
console.log(`[version] Updated ${currentVersion} -> ${targetVersion}`)
