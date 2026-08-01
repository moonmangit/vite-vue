import { http } from '../http'

export interface LogoutResponse {
  success: boolean
  message: string
}

export async function postLogout(): Promise<LogoutResponse> {
  return http.post<LogoutResponse>('/api/auth/logout')
}
