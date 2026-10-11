<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useFileDialog } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import AppButton from './AppButton.vue'
import { appComponentAttrs } from '../lib/appComponentAttrs'
import type {
  AppFileUploadHandler,
  AppFileUploadModel,
  AppFileUploadVariant,
} from './AppFileUpload.types'

defineOptions({ inheritAttrs: false })

type FileState = 'ready' | 'queued' | 'uploading' | 'complete' | 'error'

type FileItem = {
  id: number
  file?: File
  name: string
  size?: number
  previewUrl?: string
  url?: string
  state: FileState
  progress: number
  error?: 'too-large' | 'unsupported' | 'missing-handler' | 'upload'
}

const props = withDefaults(
  defineProps<{
    modelValue?: AppFileUploadModel
    variant?: AppFileUploadVariant
    multiple?: boolean
    accept?: string
    disabled?: boolean
    maxFileSize?: number
    upload?: AppFileUploadHandler
  }>(),
  {
    variant: 'default',
    multiple: false,
    disabled: false,
    maxFileSize: 1_000_000_000,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: AppFileUploadModel]
  uploadError: [payload: { file: File; error: unknown }]
}>()

const { locale, t } = useI18n({ useScope: 'global' })
const items = ref<FileItem[]>([])
const dragActive = ref(false)
let nextItemId = 0
let uploadQueueRunning = false
const uploadControllers = new Map<number, AbortController>()

const isBusy = computed(() =>
  items.value.some((item) => item.state === 'queued' || item.state === 'uploading'),
)

const { open, onChange } = useFileDialog({
  accept: props.accept || '*/*',
  multiple: props.multiple,
  reset: true,
})

function asValues(value: AppFileUploadModel | undefined): Array<File | string> {
  if (value == null) return []
  return Array.isArray(value) ? value : [value]
}

function modelValueForItems(): AppFileUploadModel {
  const values =
    props.variant === 'upload'
      ? items.value.flatMap((item) => (item.url ? [item.url] : []))
      : items.value.flatMap((item) => (item.file && item.state !== 'error' ? [item.file] : []))

  if (props.multiple) return values
  return values[0] ?? null
}

function sameValue(left: AppFileUploadModel | undefined, right: AppFileUploadModel) {
  const leftValues = asValues(left)
  const rightValues = asValues(right)
  return (
    leftValues.length === rightValues.length &&
    leftValues.every((value, index) => value === rightValues[index])
  )
}

function revokePreview(item: FileItem) {
  if (!item.previewUrl) return
  URL.revokeObjectURL(item.previewUrl)
  item.previewUrl = undefined
}

function disposeItem(item: FileItem) {
  uploadControllers.get(item.id)?.abort()
  uploadControllers.delete(item.id)
  revokePreview(item)
}

function makeFileItem(file: File, state: FileState = 'ready'): FileItem {
  return {
    id: ++nextItemId,
    file,
    name: file.name,
    size: file.size,
    previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    state,
    progress: 0,
  }
}

function makeUrlItem(url: string): FileItem {
  const path = url.split(/[?#]/, 1)[0]?.split('/').pop() || url
  let name = path
  try {
    name = decodeURIComponent(path)
  } catch {
    // Keep the original path segment when a remote URL contains malformed escapes.
  }
  const safeUrl = validateUrl(url)
  return {
    id: ++nextItemId,
    name,
    url: safeUrl ?? undefined,
    state: safeUrl ? 'complete' : 'error',
    progress: safeUrl ? 100 : 0,
    error: safeUrl ? undefined : 'upload',
  }
}

function validateUrl(value: string) {
  if (typeof value !== 'string' || !value.trim()) return undefined

  try {
    const normalized = value.trim()
    const parsed = new URL(normalized, window.location.href)
    if (['http:', 'https:', 'blob:'].includes(parsed.protocol)) return normalized
  } catch {
    // An invalid URL is surfaced as a failed upload instead of an unsafe link.
  }
  return undefined
}

function replaceItems(nextItems: FileItem[]) {
  for (const item of items.value) disposeItem(item)
  items.value = nextItems
}

function syncFromModelValue(value: AppFileUploadModel | undefined) {
  if (sameValue(value, modelValueForItems())) return

  const values = asValues(value)
  if (props.variant === 'upload') {
    replaceItems(
      values.filter((entry): entry is string => typeof entry === 'string').map(makeUrlItem),
    )
    return
  }

  replaceItems(
    values
      .filter((entry): entry is File => typeof entry !== 'string')
      .map((file) => makeFileItem(file)),
  )
}

watch(() => props.modelValue, syncFromModelValue, { immediate: true })
watch(
  () => props.variant,
  () => syncFromModelValue(props.modelValue),
)

function emitModelValue() {
  emit('update:modelValue', modelValueForItems())
}

function accepts(file: File) {
  const rules = props.accept
    ?.split(',')
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean)

  if (!rules?.length || rules.includes('*/*') || rules.includes('*')) return true

  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  return rules.some((rule) => {
    if (rule.startsWith('.')) return name.endsWith(rule)
    if (rule.endsWith('/*')) return type.startsWith(rule.slice(0, -1))
    return type === rule
  })
}

function updateFileList(files: File[]) {
  if (!files.length || props.disabled) return

  const nextItems = files.map((file) => {
    const item = makeFileItem(file, props.variant === 'upload' ? 'queued' : 'ready')
    if (file.size > props.maxFileSize) {
      item.state = 'error'
      item.error = 'too-large'
    } else if (!accepts(file)) {
      item.state = 'error'
      item.error = 'unsupported'
    } else if (props.variant === 'upload' && !props.upload) {
      item.state = 'error'
      item.error = 'missing-handler'
    }
    return item
  })

  if (props.multiple) {
    items.value.push(...nextItems)
  } else {
    replaceItems(nextItems.slice(0, 1))
  }

  if (props.variant === 'default') emitModelValue()
  else void processUploadQueue()
}

onChange((files) => {
  if (files) updateFileList(Array.from(files))
})

function browse() {
  if (!props.disabled) open()
}

function handleDrop(event: DragEvent) {
  dragActive.value = false
  if (props.disabled) return
  updateFileList(Array.from(event.dataTransfer?.files ?? []))
}

function handleDragLeave(event: DragEvent) {
  const currentTarget = event.currentTarget
  const related = event.relatedTarget
  if (
    !(currentTarget instanceof Element) ||
    !(related instanceof Node) ||
    !currentTarget.contains(related)
  ) {
    dragActive.value = false
  }
}

function setProgress(item: FileItem, progress: number) {
  if (!items.value.includes(item)) return
  const safeProgress = Number.isFinite(progress) ? Math.round(progress) : 0
  item.progress = Math.max(0, Math.min(100, safeProgress))
}

async function processUploadQueue() {
  if (uploadQueueRunning) return
  uploadQueueRunning = true

  try {
    let item = items.value.find((candidate) => candidate.state === 'queued')
    while (item) {
      const currentItem = item
      if (!currentItem.file || !props.upload) {
        currentItem.state = 'error'
        currentItem.error = 'missing-handler'
        item = items.value.find((candidate) => candidate.state === 'queued')
        continue
      }

      const controller = new AbortController()
      uploadControllers.set(currentItem.id, controller)
      currentItem.state = 'uploading'
      currentItem.progress = 0

      try {
        const url = await props.upload(currentItem.file, {
          signal: controller.signal,
          onProgress: (progress) => setProgress(currentItem, progress),
        })
        if (!controller.signal.aborted && items.value.includes(currentItem)) {
          const safeUrl = validateUrl(url)
          if (!safeUrl) throw new Error('The upload handler returned an invalid URL.')
          currentItem.url = safeUrl
          currentItem.state = 'complete'
          currentItem.progress = 100
          emitModelValue()
        }
      } catch (error) {
        if (!controller.signal.aborted && items.value.includes(currentItem)) {
          currentItem.state = 'error'
          currentItem.error = 'upload'
          emit('uploadError', { file: currentItem.file, error })
        }
      } finally {
        uploadControllers.delete(currentItem.id)
      }

      item = items.value.find((candidate) => candidate.state === 'queued')
    }
  } finally {
    uploadQueueRunning = false
    if (items.value.some((item) => item.state === 'queued')) void processUploadQueue()
  }
}

function retry(item: FileItem) {
  if (props.disabled || !item.file || !props.upload) return
  item.error = undefined
  item.state = 'queued'
  void processUploadQueue()
}

function removeItem(item: FileItem) {
  disposeItem(item)
  items.value = items.value.filter((candidate) => candidate !== item)
  emitModelValue()
}

function formatBytes(bytes: number) {
  if (bytes < 1_000) return `${bytes} B`
  const units = ['KB', 'MB', 'GB']
  let amount = bytes / 1_000
  let unitIndex = 0
  while (amount >= 1_000 && unitIndex < units.length - 1) {
    amount /= 1_000
    unitIndex += 1
  }
  return `${new Intl.NumberFormat(locale.value, { maximumFractionDigits: 1 }).format(amount)} ${units[unitIndex]}`
}

function extension(name: string) {
  const value = name.split('.').pop() ?? ''
  return value.length > 0 && value.length <= 5 ? value.toUpperCase() : 'FILE'
}

function itemStatus(item: FileItem) {
  if (item.state === 'queued') return t('shared.fileUpload.queued')
  if (item.state === 'uploading') return t('shared.fileUpload.uploading')
  if (item.state === 'complete' && props.variant === 'upload') {
    return t('shared.fileUpload.uploaded')
  }
  if (item.error === 'too-large') {
    return t('shared.fileUpload.fileTooLarge', { size: formatBytes(props.maxFileSize) })
  }
  if (item.error === 'unsupported') return t('shared.fileUpload.unsupportedType')
  if (item.error === 'missing-handler') return t('shared.fileUpload.missingHandler')
  if (item.error === 'upload') return t('shared.fileUpload.uploadFailed')
  return item.size === undefined ? '' : formatBytes(item.size)
}

function itemImage(item: FileItem) {
  return item.file?.type.startsWith('image/') ? (item.previewUrl ?? item.url) : undefined
}

onBeforeUnmount(() => {
  for (const item of items.value) disposeItem(item)
})
</script>

<template>
  <div
    v-bind="appComponentAttrs($attrs)"
    class="app-file-upload space-y-4"
    @dragenter.prevent="dragActive = !props.disabled"
    @dragover.prevent="dragActive = !props.disabled"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
  >
    <div
      class="app-file-upload__dropzone"
      :class="[
        dragActive && !props.disabled ? 'app-file-upload__dropzone--active' : '',
        props.disabled ? 'app-file-upload__dropzone--disabled' : '',
      ]"
      :aria-disabled="props.disabled"
    >
      <div class="app-file-upload__cloud-icon" aria-hidden="true">
        <i class="pi pi-cloud-upload app-text-2xl" />
      </div>
      <p class="m-0 app-text-md app-text-normal">
        {{ t('shared.fileUpload.dropPrompt') }}
        <AppButton
          type="button"
          appearance="text"
          class="app-file-upload__browse"
          :label="t('shared.fileUpload.browse')"
          :disabled="props.disabled"
          @click="browse"
        />
      </p>
      <p class="m-0 app-text-sm app-text-muted">
        {{ t('shared.fileUpload.maxSize', { size: formatBytes(props.maxFileSize) }) }}
      </p>
    </div>

    <div
      v-if="isBusy"
      class="app-file-upload__activity app-text-xs app-text-muted"
      role="status"
      aria-live="polite"
    >
      <span class="app-file-upload__dots" aria-hidden="true"><i /><i /><i /></span>
      {{ t('shared.fileUpload.uploading') }}
    </div>

    <ul
      v-if="items.length"
      class="app-file-upload__list"
      :aria-label="t('shared.fileUpload.selectedFiles')"
    >
      <li v-for="item in items" :key="item.id" class="app-file-upload__item">
        <img
          v-if="itemImage(item)"
          :src="itemImage(item)"
          :alt="t('shared.fileUpload.preview', { name: item.name })"
          class="app-file-upload__file-icon app-file-upload__file-icon--image"
        />
        <span
          v-else
          class="app-file-upload__file-icon app-text-xs app-text-muted"
          aria-hidden="true"
        >
          {{ extension(item.name) }}
        </span>

        <div class="app-file-upload__details">
          <a
            v-if="item.url && props.variant === 'upload' && item.state === 'complete'"
            class="app-file-upload__filename app-text-md app-text-normal"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ item.name }}
          </a>
          <span v-else class="app-file-upload__filename app-text-md app-text-normal">
            {{ item.name }}
          </span>
          <span
            class="app-file-upload__metadata app-text-sm"
            :class="
              item.state === 'error' ? 'text-red-600 app-dark:text-red-400' : 'app-text-muted'
            "
          >
            {{ itemStatus(item) }}
          </span>
          <div
            v-if="item.state === 'uploading'"
            class="app-file-upload__progress"
            role="progressbar"
            :aria-label="t('shared.fileUpload.progressFor', { name: item.name })"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-valuenow="item.progress"
          >
            <span :style="{ width: `${item.progress}%` }" />
          </div>
        </div>

        <AppButton
          v-if="item.state === 'error' && item.error === 'upload'"
          type="button"
          appearance="text"
          size="small"
          :label="t('shared.fileUpload.retry')"
          @click="retry(item)"
        />
        <AppButton
          v-else
          type="button"
          :icon="
            item.state === 'uploading' || item.state === 'queued' ? 'pi pi-times' : 'pi pi-trash'
          "
          appearance="text"
          tone="secondary"
          rounded
          :aria-label="t('shared.fileUpload.remove', { name: item.name })"
          @click="removeItem(item)"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.app-file-upload__dropzone {
  display: grid;
  min-height: 15rem;
  place-content: center;
  justify-items: center;
  gap: 0.55rem;
  padding: 1.5rem;
  border: 1px dashed var(--app-surface-border-color);
  border-radius: 1rem;
  background: var(--p-surface-100);
  text-align: center;
  transition:
    border-color 150ms ease,
    background-color 150ms ease;
}

.app-dark .app-file-upload__dropzone {
  background: var(--p-surface-800);
}

.app-file-upload__dropzone--active {
  border-color: var(--p-primary-color);
  background: color-mix(in srgb, var(--p-primary-color) 8%, var(--p-surface-100));
}

.app-dark .app-file-upload__dropzone--active {
  background: color-mix(in srgb, var(--p-primary-color) 16%, var(--p-surface-900));
}

.app-file-upload__dropzone--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.app-file-upload__cloud-icon {
  display: grid;
  width: 3.5rem;
  height: 3.5rem;
  place-items: center;
  border-radius: 1rem;
  background: var(--app-surface-color);
  color: var(--p-text-color);
}

.app-file-upload__browse {
  padding: 0;
  font: inherit;
  vertical-align: baseline;
}

.app-file-upload__activity {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 1.25rem;
}

.app-file-upload__dots {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
}

.app-file-upload__dots i {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background: currentColor;
  animation: app-file-upload-pulse 900ms ease-in-out infinite alternate;
}

.app-file-upload__dots i:nth-child(2) {
  animation-delay: 150ms;
}

.app-file-upload__dots i:nth-child(3) {
  animation-delay: 300ms;
}

.app-file-upload__list {
  display: grid;
  gap: 0.625rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-file-upload__item {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem;
  border: 1px solid var(--app-surface-border-color);
  border-radius: 0.875rem;
  background: var(--app-surface-color);
}

.app-file-upload__file-icon {
  display: grid;
  width: 3.5rem;
  height: 3.5rem;
  flex: none;
  place-items: center;
  border: 1px solid var(--app-surface-border-color);
  border-radius: 0.75rem;
  background: var(--p-surface-100);
  object-fit: cover;
}

.app-dark .app-file-upload__file-icon {
  background: var(--p-surface-800);
}

.app-file-upload__details {
  display: grid;
  min-width: 0;
  flex: 1;
  gap: 0.2rem;
}

.app-file-upload__filename {
  overflow: hidden;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-file-upload__metadata {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-file-upload__progress {
  height: 0.375rem;
  overflow: hidden;
  border-radius: 999px;
  background: var(--p-surface-200);
}

.app-dark .app-file-upload__progress {
  background: var(--p-surface-700);
}

.app-file-upload__progress span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--p-primary-color);
  transition: width 120ms linear;
}

@keyframes app-file-upload-pulse {
  from {
    opacity: 0.35;
    transform: scale(0.82);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-file-upload__dropzone,
  .app-file-upload__progress span {
    transition: none;
  }

  .app-file-upload__dots i {
    animation: none;
  }
}
</style>
