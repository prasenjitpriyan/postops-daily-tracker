export type UserRole = 'admin' | 'office'

export interface AuthUser {
  id: string
  email: string
  name: string
  officeId?: number // Only for office users
  role: UserRole
  token?: string // If using JWT
  lastLogin?: string
}
