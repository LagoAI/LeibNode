import { create, StateCreator } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface AuthState {
  apiKey: string | null
  setApiKey: (apiKey: string | null) => void
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

interface LoginResponse {
  apikey: string
  code: number
  limit: string
}

type AuthPersist = (
  config: StateCreator<AuthState>,
  options: PersistOptions<AuthState>
) => StateCreator<AuthState>

export const useAuth = create<AuthState>()(
  (persist as AuthPersist)(
    (set: any) => ({
      apiKey: null,
      isAuthenticated: false,

      setApiKey: (apiKey: string | null) => {
        console.log('Setting API key:', apiKey ? 'exists' : 'null')
        set({ apiKey, isAuthenticated: !!apiKey })
      },

      login: async (email: string, password: string) => {
        try {
          console.log('Starting login process...')
          const formData = new FormData()
          formData.append('mail', email)
          formData.append('password', password)

          console.log('Making login request...')
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: formData,
          })

          console.log('Login response status:', response.status)
          const responseText = await response.text()
          console.log('Login response text:', responseText)

          if (!response.ok) {
            throw new Error(`Login failed: ${responseText}`)
          }

          let data: LoginResponse
          try {
            data = JSON.parse(responseText)
          } catch (e) {
            console.error('Failed to parse login response:', e)
            throw new Error('Invalid response format')
          }

          console.log('Parsed login response:', data)
          
          if (data.code !== 0) {
            throw new Error(`Login failed with code: ${data.code}`)
          }

          console.log('Setting auth state...')
          set({ apiKey: data.apikey, isAuthenticated: true })
          console.log('Login successful, auth state updated')
        } catch (error) {
          console.error('Login error:', error)
          throw error
        }
      },

      logout: () => {
        console.log('Logging out...')
        set({ apiKey: null, isAuthenticated: false })
        console.log('Logged out')
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
) 