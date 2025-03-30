import { api } from './api'

interface LoginData {
  email: string
  password: string
}

interface SignupData {
  email: string
  password: string
  name: string
}

interface AuthResponse {
  access_token: string
  token_type: string
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data)
    return response.data
  },

  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signup', data)
    return response.data
  },

  async verify2FA(token: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/verify-2fa', { token })
    return response.data
  },

  async me() {
    const response = await api.get('/auth/me')
    return response.data
  },

  logout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
} 