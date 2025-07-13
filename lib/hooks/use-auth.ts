import { getAuthState, loginUser, logoutUser } from '@/lib/api/auth'
import { AuthUser, UserRole } from '@/types/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect, useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check auth state on initial load
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        setIsLoading(true)
        const storedUser = await AsyncStorage.getItem('auth-user')

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser) as AuthUser
          setUser(parsedUser)
          setUserRole(parsedUser.role)
        } else {
          // Fallback to API check if no stored user
          const authState = await getAuthState()
          if (authState.user) {
            await AsyncStorage.setItem(
              'auth-user',
              JSON.stringify(authState.user)
            )
            setUser(authState.user)
            setUserRole(authState.user.role)
          }
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load auth state'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadAuthState()
  }, [])

  // Login function
  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      try {
        setIsLoading(true)
        setError(null)

        const authenticatedUser = await loginUser(
          credentials.email,
          credentials.password
        )

        await AsyncStorage.setItem(
          'auth-user',
          JSON.stringify(authenticatedUser)
        )
        setUser(authenticatedUser)
        setUserRole(authenticatedUser.role)

        return authenticatedUser
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Login failed')
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  // Logout function
  const logout = useCallback(async () => {
    try {
      setIsLoading(true)
      await logoutUser()
      await AsyncStorage.removeItem('auth-user')
      setUser(null)
      setUserRole(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Check if user is authenticated
  const isAuthenticated = useCallback(() => {
    return user !== null
  }, [user])

  return {
    user,
    userRole,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated,
    setUser // For external updates if needed
  }
}
