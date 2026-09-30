import type { AppFileUploadModel } from '../../../../../shared/component/AppFileUpload.types'

export interface ShowcaseAdditionalInputState {
  textSmall: string
  textMedium: string
  textLarge: string
  passwordFeedback: string
  passwordInvalid: string
  descriptionInvalid: string
  descriptionAutoResize: string
  numberSmall: number | null
  numberLarge: number | null
  numberInvalid: number | null
  environmentInvalid: string | null
  environmentLarge: string | null
  teamsAlternate: string[]
  teamsInvalid: string[]
  checkboxSmall: boolean
  checkboxLarge: boolean
  checkboxInvalid: boolean
  checkboxIndeterminate: boolean
  radioSize: string
  radioInvalid: string
  switchInvalid: boolean
  switchOn: boolean
}

export interface ShowcaseFormState {
  name: string
  email: string
  password: string
  description: string
  environment: string | null
  teams: string[]
  search: string
  quantity: number | null
  amount: number | null
  notifications: boolean
  permissions: string[]
  maintenanceMode: boolean
  plan: string
  additionalInputs: ShowcaseAdditionalInputState
  selectedFiles: AppFileUploadModel
  uploadedFiles: AppFileUploadModel
  selectedImage: AppFileUploadModel
  selectedImages: AppFileUploadModel
  projectName: string
  dataTableSearch: string
  dataTableTeam: string
  dataTableSingleSelection: unknown | null
  dataTableMultipleSelection: unknown[]
}

export function createShowcaseFormState(): ShowcaseFormState {
  return {
    name: '',
    email: 'invalid-email',
    password: '',
    description: '',
    environment: null,
    teams: [],
    search: '',
    quantity: 12,
    amount: 1250,
    notifications: true,
    permissions: ['read'],
    maintenanceMode: false,
    plan: 'growth',
    additionalInputs: {
      textSmall: '',
      textMedium: '',
      textLarge: '',
      passwordFeedback: 'Example!Password9',
      passwordInvalid: 'weak',
      descriptionInvalid: '',
      descriptionAutoResize: 'Add more lines to see the text area grow with its content.',
      numberSmall: 24,
      numberLarge: 24,
      numberInvalid: -1,
      environmentInvalid: null,
      environmentLarge: 'production',
      teamsAlternate: ['platform', 'design'],
      teamsInvalid: [],
      checkboxSmall: true,
      checkboxLarge: true,
      checkboxInvalid: false,
      checkboxIndeterminate: false,
      radioSize: 'small',
      radioInvalid: '',
      switchInvalid: false,
      switchOn: true,
    },
    selectedFiles: [],
    uploadedFiles: [],
    selectedImage: null,
    selectedImages: [],
    projectName: '',
    dataTableSearch: '',
    dataTableTeam: '',
    dataTableSingleSelection: null,
    dataTableMultipleSelection: [],
  }
}
