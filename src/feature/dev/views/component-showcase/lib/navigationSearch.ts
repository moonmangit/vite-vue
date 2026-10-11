import { en } from '../../../i18n/en'
import { th } from '../../../i18n/th'

const wordSegmenter = new Intl.Segmenter('th', { granularity: 'word' })
const graphemeSegmenter = new Intl.Segmenter('th', { granularity: 'grapheme' })
const tokenCache = new Map<string, string[]>()
const graphemeCache = new Map<string, string[]>()
const translatedTextCache = new Map<string, string>()

export function normalizeSearchText(value: string): string {
  return value.normalize('NFKC').replace(/\s+/g, ' ').toLocaleLowerCase().trim()
}

function collectTranslationPairs(english: unknown, thai: unknown): Array<[string, string]> {
  if (typeof english === 'string' && typeof thai === 'string') return [[english, thai]]
  if (!english || !thai || typeof english !== 'object' || typeof thai !== 'object') return []

  return Object.keys(english).flatMap((key) =>
    key in thai
      ? collectTranslationPairs(
          (english as Record<string, unknown>)[key],
          (thai as Record<string, unknown>)[key],
        )
      : [],
  )
}

const translationPairs: Array<[string, string]> = collectTranslationPairs(en, th).map(
  ([english, thai]) => [normalizeSearchText(english), normalizeSearchText(thai)],
)

export function translatedSearchText(value: string, locale: string): string {
  const normalizedValue = normalizeSearchText(value)
  const cacheKey = `${locale}:${normalizedValue}`
  if (translatedTextCache.has(cacheKey)) return translatedTextCache.get(cacheKey) ?? ''

  const isEnglish = locale.startsWith('en')
  const translatedTerms = translationPairs.flatMap(([english, thai]) => {
    const source = isEnglish ? english : thai
    const counterpart = isEnglish ? thai : english
    return Array.from(graphemeSegmenter.segment(source)).length >= 3 &&
      normalizedValue.includes(source)
      ? [counterpart]
      : []
  })

  const translatedText = [...new Set(translatedTerms)].join(' ')
  if (translatedTextCache.size >= 64)
    translatedTextCache.delete(translatedTextCache.keys().next().value!)
  translatedTextCache.set(cacheKey, translatedText)
  return translatedText
}

function tokenize(value: string): string[] {
  const normalized = normalizeSearchText(value)
  const cached = tokenCache.get(normalized)
  if (cached) return cached

  const tokens = Array.from(wordSegmenter.segment(normalized))
    .filter((segment) => segment.isWordLike)
    .map((segment) => segment.segment)
  if (tokenCache.size >= 128) tokenCache.delete(tokenCache.keys().next().value!)
  tokenCache.set(normalized, tokens)
  return tokens
}

function graphemes(value: string): string[] {
  const cached = graphemeCache.get(value)
  if (cached) return cached

  const segments = Array.from(graphemeSegmenter.segment(value), (part) => part.segment)
  if (graphemeCache.size >= 512) graphemeCache.delete(graphemeCache.keys().next().value!)
  graphemeCache.set(value, segments)
  return segments
}

function editDistance(left: string[], right: string[], limit: number): number {
  if (Math.abs(left.length - right.length) > limit) return limit + 1

  let previous = Array.from({ length: right.length + 1 }, (_, index) => index)
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex]
    let minimum = leftIndex

    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const cost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1
      const distance = Math.min(
        previous[rightIndex] + 1,
        current[rightIndex - 1] + 1,
        previous[rightIndex - 1] + cost,
      )
      current[rightIndex] = distance
      minimum = Math.min(minimum, distance)
    }

    if (minimum > limit) return limit + 1
    previous = current
  }

  return previous[right.length]
}

function tokenSimilarity(query: string, candidate: string): number {
  if (candidate === query) return 1

  const queryCharacters = graphemes(query)
  const candidateCharacters = graphemes(candidate)
  const longest = Math.max(queryCharacters.length, candidateCharacters.length)
  const shortest = Math.min(queryCharacters.length, candidateCharacters.length)

  if (shortest < 3) return 0
  if (candidate.includes(query) || query.includes(candidate)) return shortest / longest

  const distanceLimit = Math.floor(longest * 0.4)
  const distance = editDistance(queryCharacters, candidateCharacters, distanceLimit)
  return distance <= distanceLimit ? 1 - distance / longest : 0
}

export function matchesSearchText(query: string, text: string): boolean {
  const normalizedQuery = normalizeSearchText(query)
  const normalizedText = normalizeSearchText(text)
  if (!normalizedQuery) return true
  if (normalizedText.includes(normalizedQuery)) return true

  const queryTokens = tokenize(normalizedQuery)
  if (queryTokens.length === 0) return false

  const textTokens = tokenize(normalizedText)
  return queryTokens.every((queryToken) => {
    if (graphemes(queryToken).length < 3) {
      return textTokens.some((textToken) => textToken.includes(queryToken))
    }

    return textTokens.some((textToken) => tokenSimilarity(queryToken, textToken) >= 0.6)
  })
}
