import { mockUsers } from '@/constants/users'
import { AuthUser } from '@/types/auth'

export async function loginUser(
  email: string,
  password: string
): Promise<AuthUser> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  )

  if (!user) {
    throw new Error('Invalid email or password')
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    officeId: user.officeId,
    role: user.role,
    lastLogin: new Date().toISOString()
  }
}

export async function logoutUser(): Promise<void> {
  // In a real app, you might call your API to invalidate the token
  await new Promise((resolve) => setTimeout(resolve, 200))
}

export async function getAuthState(): Promise<{ user: AuthUser | null }> {
  // In a real app, this would verify the token with your backend
  await new Promise((resolve) => setTimeout(resolve, 200))
  return { user: null } // Default to null - actual implementation would check storage
}
