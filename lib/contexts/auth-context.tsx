import { AuthUser, UserRole } from '@/types/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  user: AuthUser | null
  userRole: UserRole | null
  isLoading: boolean
  login: (user: AuthUser) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('auth-user')
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser) as AuthUser
          setUser(parsedUser)
          setUserRole(parsedUser.role)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadAuthState()
  }, [])

  const login = async (userData: AuthUser) => {
    await AsyncStorage.setItem('auth-user', JSON.stringify(userData))
    setUser(userData)
    setUserRole(userData.role)
  }

  const logout = async () => {
    await AsyncStorage.removeItem('auth-user')
    setUser(null)
    setUserRole(null)
  }

  return (
    <AuthContext.Provider value={{ user, userRole, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
