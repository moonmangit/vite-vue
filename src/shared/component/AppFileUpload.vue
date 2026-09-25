<script setup lang="ts">
import PrimeFileUpload from 'primevue/fileupload'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    name?: string
    mode?: 'basic' | 'advanced'
    multiple?: boolean
    accept?: string
    disabled?: boolean
    auto?: boolean
    maxFileSize?: number
    fileLimit?: number
    customUpload?: boolean
    showUploadButton?: boolean
    showCancelButton?: boolean
    chooseLabel?: string
  }>(),
  {
    mode: 'advanced',
    multiple: false,
    disabled: false,
    auto: false,
    customUpload: false,
    showUploadButton: true,
    showCancelButton: true,
  },
)
</script>

<template>
  <PrimeFileUpload
    v-bind="appComponentAttrs($attrs)"
    :name="props.name"
    :mode="props.mode"
    :multiple="props.multiple"
    :accept="props.accept"
    :disabled="props.disabled"
    :auto="props.auto"
    :max-file-size="props.maxFileSize"
    :file-limit="props.fileLimit"
    :custom-upload="props.customUpload"
    :show-upload-button="props.showUploadButton"
    :show-cancel-button="props.showCancelButton"
    :choose-label="props.chooseLabel"
  >
    <template v-if="$slots.header" #header="slotProps">
      <slot name="header" v-bind="slotProps" />
    </template>
    <template v-if="$slots.content" #content="slotProps">
      <slot name="content" v-bind="slotProps" />
    </template>
    <template v-if="$slots.empty" #empty>
      <slot name="empty" />
    </template>
  </PrimeFileUpload>
</template>
