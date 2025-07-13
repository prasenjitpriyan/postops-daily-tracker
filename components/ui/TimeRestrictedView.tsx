import { useTimeValidation } from '@/lib/hooks/use-time-validation'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface TimeRestrictedViewProps {
  children: React.ReactNode
  customMessage?: string
}

const TimeRestrictedView: React.FC<TimeRestrictedViewProps> = ({
  children,
  customMessage
}) => {
  const { isWithinAllowedTime, currentTime } = useTimeValidation()

  if (isWithinAllowedTime) {
    return <>{children}</>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        {customMessage ||
          `Submissions are only allowed between 6:00 AM and 11:59 PM. Current time: ${currentTime}`}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#FFB74D'
  },
  message: {
    color: '#E65100',
    textAlign: 'center'
  }
})

export default TimeRestrictedView
