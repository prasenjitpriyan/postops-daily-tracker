import { submitOfficeData } from '@/lib/api/sheets'
import { OfficeSubmission } from '@/types/data'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Alert } from 'react-native'
import { useTimeValidation } from './use-time-validation'

interface UseSubmitDataOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export const useSubmitData = (options?: UseSubmitDataOptions) => {
  const queryClient = useQueryClient()
  const { isWithinAllowedTime } = useTimeValidation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const mutation = useMutation({
    mutationFn: async ({
      officeId,
      data
    }: {
      officeId: number
      data: OfficeSubmission
    }) => {
      if (!isWithinAllowedTime) {
        throw new Error(
          'Submissions are only allowed between 6:00 AM and 11:59 PM'
        )
      }

      setIsSubmitting(true)
      try {
        // Transform data to ensure all fields are string or number
        const sanitizedData: { [field: string]: string | number } =
          Object.fromEntries(
            Object.entries(data)
              .filter(([_, value]) => value !== undefined)
              .map(([key, value]) => [
                key,
                value instanceof Date ? value.toISOString() : value
              ])
              .filter(
                ([_, value]) =>
                  typeof value === 'string' || typeof value === 'number'
              )
          )
        return await submitOfficeData(officeId, sanitizedData)
      } finally {
        setIsSubmitting(false)
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['officeData', variables.officeId]
      })
      options?.onSuccess?.()
    },
    onError: (error: Error) => {
      Alert.alert('Submission Failed', error.message)
      options?.onError?.(error)
    }
  })

  return {
    submitData: mutation.mutateAsync,
    isSubmitting,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset
  }
}
