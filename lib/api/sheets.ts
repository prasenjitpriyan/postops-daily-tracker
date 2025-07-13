import { OfficeData } from '@/types/data'

// Mock implementation - replace with actual Google Sheets API calls
export async function getOfficeData(
  officeId: number,
  date: Date
): Promise<OfficeData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock data - replace with actual data fetching
  return {
    officeId,
    officeName: `Office ${officeId}`,
    submittedToday: Math.random() > 0.5, // 50% chance of having submitted
    lastSubmission: new Date().toISOString(),
    todaysData: {
      field1: 'Sample Value 1',
      field2: 42
      // Add more fields as needed
    },
    previousSubmissions: [
      {
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        data: {
          field1: 'Yesterday Value 1',
          field2: 24
        }
      }
    ]
  }
}

export async function submitOfficeData(
  officeId: number,
  data: OfficeData['todaysData']
) {
  // Simulate submitting data to Google Sheets or a backend
  await new Promise((resolve) => setTimeout(resolve, 500))

  console.log(`Submitted data for office ${officeId}:`, data)

  return { success: true }
}
