import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  apiKey: string | null
  isAuthenticated: boolean
  setApiKey: (apiKey: string | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
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

          const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: formData
          })

          const data = await response.json()
          
          if (data.code !== 0) {
            throw new Error(data.message || 'Authentication failed')
          }

          console.log('Login successful, setting state...')
          set({ apiKey: data.apikey, isAuthenticated: true })
          console.log('State updated')
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
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        console.log('Hydrating auth state:', state)
      }
    }
  )
) 