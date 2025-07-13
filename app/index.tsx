import { useAuth } from '@/lib/hooks/use-auth'
import { Redirect } from 'expo-router'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export default function Index() {
  const { isLoading, user, userRole } = useAuth()

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e40af" />
      </View>
    )
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />
  }

  switch (userRole) {
    case 'admin':
      return <Redirect href="/(admin)/dashboard" />
    case 'office':
      return <Redirect href={`/(office)/${user.officeId}/home`} />
    default:
      return <Redirect href="/(auth)/login" />
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})
