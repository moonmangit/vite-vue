import { http } from '../http'

export interface LoginWithUsernameRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginWithUsernameResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
    role: string
    avatar: string
  }
}

export async function postLoginWithUsername(
  data: LoginWithUsernameRequest,
): Promise<LoginWithUsernameResponse> {
  return http.post<LoginWithUsernameResponse>('/api/auth/login', data)
}
