import { http } from '../http'

export interface LoginWithGoogleAuthRequest {
  code?: string
  redirectUri?: string
}

export interface LoginWithGoogleAuthResponse {
  redirectUrl?: string
  token?: string
  user?: {
    id: string
    name: string
    email: string
    role: string
  }
}

export async function getLoginWithGoogleAuth(
  params?: LoginWithGoogleAuthRequest,
): Promise<LoginWithGoogleAuthResponse> {
  return http.get<LoginWithGoogleAuthResponse>('/api/auth/google', { params })
}
