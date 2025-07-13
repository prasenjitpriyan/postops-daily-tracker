import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export const useTimeValidation = () => {
  const [currentTime, setCurrentTime] = useState(dayjs())
  const [isWithinAllowedTime, setIsWithinAllowedTime] = useState(false)

  useEffect(() => {
    const checkTime = () => {
      const now = dayjs()
      setCurrentTime(now)

      // Allow submissions from 6:00 AM to 11:59 PM
      const isAllowed = now.hour() >= 6 && now.hour() < 24
      setIsWithinAllowedTime(isAllowed)
    }

    checkTime()
    const interval = setInterval(checkTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return {
    isWithinAllowedTime,
    currentTime: currentTime.format('h:mm A'),
    currentHour: currentTime.hour()
  }
}
