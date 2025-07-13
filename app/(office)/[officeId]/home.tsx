import TimeRestrictedView from '@/components/ui/TimeRestrictedView'
import { useOfficeData } from '@/lib/hooks/use-office-data'
import { MaterialIcons } from '@expo/vector-icons'
import { Link, useLocalSearchParams } from 'expo-router'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function OfficeHome() {
  const { officeId } = useLocalSearchParams()
  const { data, isLoading } = useOfficeData({ officeId: Number(officeId) })
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Office {officeId} Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today&apos;s Submission</Text>
        <View style={styles.statusRow}>
          <MaterialIcons
            name={data?.submittedToday ? 'check-circle' : 'error'}
            size={24}
            color={data?.submittedToday ? '#4CAF50' : '#F44336'}
          />
          <Text style={styles.statusText}>
            {data?.submittedToday ? 'Submitted' : 'Pending'}
          </Text>
        </View>
      </View>

      <TimeRestrictedView>
        <Link href={`/(office)/${officeId}/data-entry`} asChild>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              {data?.submittedToday ? 'Update Data' : 'Submit Data'}
            </Text>
            <MaterialIcons name="arrow-forward" size={20} color="white" />
          </View>
        </Link>
      </TimeRestrictedView>

      <Link href={`/(office)/${officeId}/view-submissions`} asChild>
        <View style={styles.secondaryButton}>
          <Text>View Past Submissions</Text>
          <MaterialIcons name="history" size={20} color="#333" />
        </View>
      </Link>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusText: {
    marginLeft: 10,
    fontSize: 16
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
