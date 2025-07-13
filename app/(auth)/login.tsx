import { useAuth } from '@/lib/hooks/use-auth'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleLogin = async () => {
    try {
      setLoading(true)
      loginSchema.parse({ email, password })
      await login({ email, password })
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Invalid credentials'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Office Data Collection</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        style={styles.button}
      >
        Login
      </Button>
      <Link href="/(auth)/reset-password" asChild>
        <Button mode="text" style={styles.link}>
          Forgot Password?
        </Button>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },
  input: {
    marginBottom: 15
  },
  button: {
    marginTop: 10,
    paddingVertical: 8
  },
  link: {
    marginTop: 15
  }
})
