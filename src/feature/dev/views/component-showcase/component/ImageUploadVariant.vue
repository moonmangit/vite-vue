<script setup lang="ts">
import { onBeforeUnmount, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import AppButton from '../../../../../shared/component/AppButton.vue'
import AppFileUpload from '../../../../../shared/component/AppFileUpload.vue'

defineProps<{
  name: string
  multiple: boolean
}>()

const { t } = useI18n({ useScope: 'global' })
const previews = reactive(new Map<File, string>())

function rememberPreviews(event: { files: File[] }) {
  for (const file of event.files) {
    if (file.type.startsWith('image/') && !previews.has(file)) {
      previews.set(file, URL.createObjectURL(file))
    }
  }
}

function removePreview(file: File, index: number, removeFile: (index: number) => void) {
  const preview = previews.get(file)
  if (preview) URL.revokeObjectURL(preview)
  previews.delete(file)
  removeFile(index)
}

function clearPreviews(clearFiles: () => void) {
  for (const preview of previews.values()) URL.revokeObjectURL(preview)
  previews.clear()
  clearFiles()
}

onBeforeUnmount(() => {
  for (const preview of previews.values()) URL.revokeObjectURL(preview)
  previews.clear()
})
</script>

<template>
  <AppFileUpload
    :name="name"
    :multiple="multiple"
    accept="image/*"
    :max-file-size="5000000"
    :file-limit="multiple ? 4 : 1"
    custom-upload
    :show-upload-button="false"
    :show-cancel-button="false"
    :choose-label="t('features.dev.input.chooseFiles')"
    @select="rememberPreviews"
  >
    <template #header="{ chooseCallback, clearCallback, files }">
      <div class="flex flex-wrap items-center gap-2">
        <AppButton
          type="button"
          icon="pi pi-images"
          :label="t('features.dev.input.chooseFiles')"
          @click="chooseCallback()"
        />
        <AppButton
          type="button"
          tone="secondary"
          appearance="outlined"
          :label="t('features.dev.input.clearFiles')"
          :disabled="files.length === 0"
          @click="clearPreviews(clearCallback)"
        />
      </div>
    </template>
    <template #content="{ files, removeFileCallback }">
      <div v-if="files.length" class="grid gap-3 pt-4 sm:grid-cols-2 xl:grid-cols-4">
        <figure v-for="(file, index) in files" :key="`${file.name}-${file.size}`" class="m-0">
          <img
            :src="previews.get(file)"
            :alt="`${t('features.dev.input.preview')}: ${file.name}`"
            class="h-36 w-full rounded-lg bg-surface-100 object-cover app-dark:bg-surface-800"
          />
          <figcaption class="flex items-center justify-between gap-2 p-2">
            <span class="truncate app-text-xs app-text-normal" :title="file.name">{{
              file.name
            }}</span>
            <AppButton
              type="button"
              icon="pi pi-times"
              tone="secondary"
              appearance="text"
              rounded
              :aria-label="t('features.dev.input.removeFile')"
              @click="removePreview(file, index, removeFileCallback)"
            />
          </figcaption>
        </figure>
      </div>
      <p v-else class="py-5 text-center app-text-sm app-text-muted">
        {{ t('features.dev.input.dropImages') }}
      </p>
    </template>
  </AppFileUpload>
</template>
