import { Link } from 'expo-router'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>🏠 Home Screen</Text>
      <Link href="/details" asChild>
        <Button title="Go to Details" />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
