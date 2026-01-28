import { useEffect, useState } from 'react'

type CountdownProps = {
  targetDate: Date
  onDeadlineChange?: (isAfterDeadline: boolean) => void
}

type TimeLeft = {
  totalMs: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date().getTime()
  const target = targetDate.getTime()
  const diff = target - now

  const clamped = diff > 0 ? diff : 0

  const seconds = Math.floor(clamped / 1000) % 60
  const minutes = Math.floor(clamped / (1000 * 60)) % 60
  const hours = Math.floor(clamped / (1000 * 60 * 60)) % 24
  const days = Math.floor(clamped / (1000 * 60 * 60 * 24))

  return {
    totalMs: diff,
    days,
    hours,
    minutes,
    seconds,
  }
}

export function Countdown({ targetDate, onDeadlineChange }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate))

  useEffect(() => {
    const initialAfterDeadline = timeLeft.totalMs <= 0
    onDeadlineChange?.(initialAfterDeadline)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft((prev) => {
        const updated = getTimeLeft(targetDate)
        const wasAfter = prev.totalMs <= 0
        const isAfter = updated.totalMs <= 0

        if (wasAfter !== isAfter) {
          onDeadlineChange?.(isAfter)
        }

        return updated
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [targetDate, onDeadlineChange])

  const { days, hours, minutes, seconds } = timeLeft

  const format = (value: number) => value.toString().padStart(2, '0')

  return (
    <div className="countdown">
      <div className="countdown-item">
        <span className="countdown-value">{days}</span>
        <span className="countdown-label">days</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{format(hours)}</span>
        <span className="countdown-label">hours</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{format(minutes)}</span>
        <span className="countdown-label">minutes</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{format(seconds)}</span>
        <span className="countdown-label">seconds</span>
      </div>
    </div>
  )
}

