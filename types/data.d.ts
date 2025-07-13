export interface OfficeData {
  officeId: number
  officeName: string
  submittedToday: boolean
  lastSubmission?: string
  todaysData?: {
    [field: string]: string | number
  }
  previousSubmissions: {
    date: string
    data: Record<string, string | number>
  }[]
}

export interface OfficeSubmission {
  officeId: number
  submissionDate: Date
  fields: Record<string, string | number>
  submittedBy?: string
  field1: string
  field2: number
  [key: string]:
    | string
    | number
    | Record<string, string | number>
    | Date
    | undefined
}
