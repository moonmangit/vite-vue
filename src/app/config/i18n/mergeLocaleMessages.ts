export type LocaleMessageTree = {
  [key: string]: string | LocaleMessageTree
}

export interface LocaleMessageModule {
  source: string
  namespace: string[]
  messages: LocaleMessageTree
}

function mergeTree(
  target: LocaleMessageTree,
  incoming: LocaleMessageTree,
  path: string,
  source: string,
  owners: Map<string, string>,
) {
  for (const [key, value] of Object.entries(incoming)) {
    const messagePath = path ? `${path}.${key}` : key
    const existing = target[key]

    if (typeof value === 'string') {
      if (existing !== undefined) {
        const owner = owners.get(messagePath) ?? 'another message module'
        throw new Error(`Duplicate i18n key "${messagePath}" from ${owner} and ${source}.`)
      }

      target[key] = value
      owners.set(messagePath, source)
      continue
    }

    if (typeof existing === 'string') {
      const owner = owners.get(messagePath) ?? 'another message module'
      throw new Error(
        `I18n namespace "${messagePath}" from ${source} conflicts with a key from ${owner}.`,
      )
    }

    const child = existing ?? {}
    target[key] = child
    mergeTree(child, value, messagePath, source, owners)
  }
}

export function mergeLocaleMessages(modules: readonly LocaleMessageModule[]): LocaleMessageTree {
  const merged: LocaleMessageTree = {}
  const owners = new Map<string, string>()

  for (const module of modules) {
    let target = merged
    for (const segment of module.namespace) {
      const existing = target[segment]
      if (typeof existing === 'string') {
        const owner = owners.get(module.namespace.join('.')) ?? 'another message module'
        throw new Error(
          `I18n namespace "${module.namespace.join('.')}" from ${module.source} conflicts with a key from ${owner}.`,
        )
      }

      const child = existing ?? {}
      target[segment] = child
      target = child
    }

    mergeTree(target, module.messages, module.namespace.join('.'), module.source, owners)
  }

  return merged
}

function getMessageShape(messages: LocaleMessageTree): string {
  return JSON.stringify(
    Object.keys(messages)
      .sort()
      .map((key) => {
        const value = messages[key]
        const shape =
          typeof value === 'string'
            ? ['message', [...value.matchAll(/\{([^{}]+)\}/g)].map((match) => match[1]).sort()]
            : getMessageShape(value)
        return [key, shape]
      }),
  )
}

export function assertLocaleModuleParity(
  primary: readonly LocaleMessageModule[],
  secondary: readonly LocaleMessageModule[],
  primaryLocale: string,
  secondaryLocale: string,
) {
  if (primary.length !== secondary.length) {
    throw new Error(`Locale module count differs between ${primaryLocale} and ${secondaryLocale}.`)
  }

  for (let index = 0; index < primary.length; index += 1) {
    const primaryModule = primary[index]
    const secondaryModule = secondary[index]

    if (
      primaryModule.source !== secondaryModule.source ||
      primaryModule.namespace.join('.') !== secondaryModule.namespace.join('.')
    ) {
      throw new Error(
        `Locale module order differs between ${primaryLocale} and ${secondaryLocale}.`,
      )
    }

    if (getMessageShape(primaryModule.messages) !== getMessageShape(secondaryModule.messages)) {
      throw new Error(
        `I18n keys differ for ${primaryModule.source} between ${primaryLocale} and ${secondaryLocale}.`,
      )
    }
  }
}
