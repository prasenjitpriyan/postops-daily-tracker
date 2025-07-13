import { getOfficeData } from '@/lib/api/sheets'
import { OfficeData } from '@/types/data'
import { useQuery } from '@tanstack/react-query'

interface UseOfficeDataOptions {
  officeId: number
  date?: Date
}

export const useOfficeData = ({
  officeId,
  date = new Date()
}: UseOfficeDataOptions) => {
  const queryKey = ['officeData', officeId, date.toISOString().split('T')[0]]

  return useQuery<OfficeData, Error>({
    queryKey,
    queryFn: async () => {
      const data = await getOfficeData(officeId, date)
      if (!data) {
        throw new Error('No data found for this office')
      }
      return data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2
  })
}
