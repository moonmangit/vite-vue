import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const errors = []
const sections = new Set(['app', 'shared', 'feature'])
const requestedSection = process.argv[2] ?? 'all'

if (requestedSection !== 'all' && !sections.has(requestedSection)) {
  console.error(
    `Unknown convention section "${requestedSection}". Use app, shared, feature, or all.`,
  )
  process.exit(2)
}

function requireFile(file, reason) {
  if (!existsSync(join(root, file))) errors.push(`${file}: ${reason}`)
}

function directories(path) {
  const absolutePath = join(root, path)
  if (!existsSync(absolutePath)) return []
  return readdirSync(absolutePath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
}

function containsFiles(path) {
  const absolutePath = join(root, path)
  if (!existsSync(absolutePath)) return false
  return readdirSync(absolutePath, { withFileTypes: true }).some((entry) => {
    if (entry.isFile()) return true
    return entry.isDirectory() && containsFiles(join(path, entry.name))
  })
}

function checkApp() {
  requireFile('src/app/App.vue', 'app root must provide App.vue')
  requireFile('src/app/config/main.ts', 'app config entry point is required')
  requireFile('src/app/layout', 'app layouts must live under app/layout/')

  for (const configName of directories('src/app/config')) {
    requireFile(`src/app/config/${configName}/main.ts`, 'each app config module needs main.ts')
  }
}

function checkFeatures() {
  for (const featureName of directories('src/feature')) {
    const featurePath = `src/feature/${featureName}`
    requireFile(`${featurePath}/route.config.ts`, 'each feature needs route.config.ts')
    requireFile(`${featurePath}/navigation.config.ts`, 'each feature needs navigation.config.ts')

    const legacyViewsPath = join(root, featurePath, 'view')
    if (containsFiles(legacyViewsPath)) {
      errors.push(`${featurePath}/view/: use the convention's plural views/ directory`)
    }

    const viewPath = `${featurePath}/views`
    if (!directories(viewPath).length) {
      errors.push(`${viewPath}/: add at least one view folder containing main.vue`)
    }

    for (const viewName of directories(viewPath)) {
      requireFile(`${viewPath}/${viewName}/main.vue`, 'each feature view needs main.vue')
    }
  }
}

function checkShared() {
  const sharedCategories = new Set([
    'asset',
    'component',
    'composable',
    'i18n',
    'lib',
    'section',
    'service',
    'store',
  ])

  for (const sharedName of directories('src/shared')) {
    const sharedPath = join(root, 'src/shared', sharedName)
    if (!readdirSync(sharedPath).length) continue
    if (!sharedCategories.has(sharedName)) {
      requireFile(
        `src/shared/${sharedName}/main.ts`,
        'each shared system needs a main.ts entry point',
      )
    }
  }
}

const checks = {
  app: checkApp,
  feature: checkFeatures,
  shared: checkShared,
}
const sectionsToCheck = requestedSection === 'all' ? [...sections] : [requestedSection]

for (const section of sectionsToCheck) checks[section]()

if (errors.length) {
  console.error('Architecture check failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log(`Architecture check passed (${requestedSection}).`)
}
