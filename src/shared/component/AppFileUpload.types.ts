export type AppFileUploadVariant = 'default' | 'upload'
export type AppFileUploadModel = File | File[] | string | string[] | null

export type AppFileUploadHandler = (
  file: File,
  context: {
    signal: AbortSignal
    onProgress: (progress: number) => void
  },
) => Promise<string>
