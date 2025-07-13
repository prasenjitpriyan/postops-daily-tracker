import { Link } from 'expo-router'
import { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('')

  const handleReset = () => {
    Alert.alert('Check your email', `Password reset link sent to ${email}`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button mode="contained" onPress={handleReset} style={styles.button}>
        Send Reset Link
      </Button>
      <Link href="/(auth)/login" asChild>
        <Button mode="text" style={styles.link}>
          Back to Login
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
