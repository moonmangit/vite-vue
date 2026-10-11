import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const sourceRoot = join(root, 'src')
const errors = []
const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
const tones = ['normal', 'muted', 'disabled']

function vueFiles(directory) {
  if (!existsSync(directory)) return []
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return vueFiles(path)
    return entry.isFile() && entry.name.endsWith('.vue') ? [path] : []
  })
}

const stylesheet = readFileSync(join(sourceRoot, 'style.css'), 'utf8')
for (const size of sizes) {
  if (!stylesheet.includes(`--app-type-${size}:`)) {
    errors.push(`src/style.css: missing --app-type-${size} typography token`)
  }
  if (!stylesheet.includes(`.app-text-${size}`)) {
    errors.push(`src/style.css: missing .app-text-${size} typography class`)
  }
}

if (!stylesheet.includes('.app-text-custom')) {
  errors.push('src/style.css: missing .app-text-custom size utility')
}

for (const tone of tones) {
  if (!stylesheet.includes(`.app-text-${tone}`)) {
    errors.push(`src/style.css: missing .app-text-${tone} typography tone`)
  }
}

for (const stateTone of ['app-hover-text-normal', 'app-group-hover-text-normal']) {
  if (!stylesheet.includes(`.${stateTone}`)) {
    errors.push(`src/style.css: missing ${stateTone} typography state`)
  }
}

if (!stylesheet.includes('--app-font-size')) {
  errors.push('src/style.css: custom sizing must be supported through --app-font-size')
}

const legacyFontSize = /(?<![\w-])text-(?:xs|sm|base|lg|xl|[2-6]xl)\b|(?<![\w-])text-\[[^\]]+\]/g
const legacyInlineFontSize = /(?:^|[;{\s])font-size\s*:/g
for (const file of vueFiles(sourceRoot)) {
  const content = readFileSync(file, 'utf8')
  const path = file.slice(root.length + 1).replaceAll('\\', '/')
  for (const match of content.matchAll(legacyFontSize)) {
    const line = content.slice(0, match.index).split('\n').length
    errors.push(`${path}:${line}: replace ${match[0]} with app-text-* utilities`)
  }
  for (const match of content.matchAll(legacyInlineFontSize)) {
    const line = content.slice(0, match.index).split('\n').length
    errors.push(`${path}:${line}: use --app-font-size with an app-text-* utility`)
  }
}

const asideFiles = [
  'src/app/layout/app/SidebarNavSection.vue',
  'src/app/layout/app/SidebarNavItemSection.vue',
]
const disallowedAsideTypography = /\bapp-text-(?:xs|custom|lg|xl|2xl|3xl)\b|--app-font-size\s*:/g

for (const path of asideFiles) {
  const content = readFileSync(join(root, path), 'utf8')
  for (const match of content.matchAll(disallowedAsideTypography)) {
    const line = content.slice(0, match.index).split('\n').length
    errors.push(`${path}:${line}: aside navigation may use only app-text-sm or app-text-md`)
  }
}

if (errors.length) {
  console.error('Typography check failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log('Typography check passed.')
}
