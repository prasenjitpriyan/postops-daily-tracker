import { useAuth } from '@/lib/hooks/use-auth'
import { Redirect } from 'expo-router'

export default function OfficeIndex() {
  const { user } = useAuth()
  return <Redirect href={`/(office)/${user?.officeId}/home`} />
}
