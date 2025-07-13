import { useSubmitData } from '@/lib/hooks/use-submission'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { Alert, ScrollView, StyleSheet } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'

export default function DataEntryScreen() {
  const { officeId } = useLocalSearchParams()

  const [formData, setFormData] = useState<{ field1: string; field2: string }>({
    field1: '',
    field2: ''
  })

  const { submitData, isSubmitting } = useSubmitData()

  const handleSubmit = async () => {
    if (formData.field1 === '' || formData.field2 === '') {
      Alert.alert('Validation Error', 'Please fill in all fields')
      return
    }

    const field2Num = Number(formData.field2)
    if (isNaN(field2Num)) {
      Alert.alert('Validation Error', 'Field 2 must be a number')
      return
    }

    try {
      await submitData({
        officeId: Number(officeId),
        data: {
          officeId: Number(officeId),
          submissionDate: new Date(), // Date object allowed now by interface
          fields: {
            field1: formData.field1,
            field2: field2Num
          },
          field1: formData.field1,
          field2: field2Num
        }
      })

      Alert.alert('Success', 'Data submitted successfully')
      router.back()
    } catch {
      Alert.alert('Error', 'Failed to submit data')
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Data Entry for Office {officeId}</Text>

      <TextInput
        label="Field 1"
        value={formData.field1}
        onChangeText={(text) => setFormData({ ...formData, field1: text })}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Field 2"
        value={formData.field2}
        onChangeText={(text) => setFormData({ ...formData, field2: text })}
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={isSubmitting}
        style={styles.button}
      >
        Submit Data
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    marginBottom: 15
  },
  button: {
    marginTop: 20
  }
})
