import { useState } from 'react'
import {
  HEADER_MESSAGE,
  IMAGE_PATH,
  LOCKED_MESSAGE,
  OPEN_SOUND_PATH,
  PAGE_TITLE,
  READY_MESSAGE,
  REVEAL_MESSAGE,
  TARGET_DATETIME,
} from './config'
import { Countdown } from './components/Countdown'
import { GiftBox } from './components/GiftBox'
import { RevealImage } from './components/RevealImage'

const targetDate = new Date(TARGET_DATETIME)

export function App() {
  const [isAfterDeadline, setIsAfterDeadline] = useState<boolean>(false)
  const [isUnwrapped, setIsUnwrapped] = useState<boolean>(false)

  const handleDeadlineChange = (afterDeadline: boolean) => {
    setIsAfterDeadline(afterDeadline)
  }

  const handleUnwrap = () => {
    if (isUnwrapped) return
    // Play sound on user interaction
    const audio = new Audio(OPEN_SOUND_PATH)
    void audio.play().catch(() => {
      // Silently ignore if the browser blocks playback
    })
    window.setTimeout(() => {
      setIsUnwrapped(true)
    }, 2000)
  }

  const helperText = !isAfterDeadline
    ? LOCKED_MESSAGE
    : isUnwrapped
      ? REVEAL_MESSAGE
      : READY_MESSAGE

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">{PAGE_TITLE}</h1>
        <p className="page-subtitle">{HEADER_MESSAGE}</p>
      </header>

      <main className="page-main">
        <section className="countdown-section" aria-label="Countdown until your gift unlocks">
          <Countdown targetDate={targetDate} onDeadlineChange={handleDeadlineChange} />
          <p className="helper-text">{helperText}</p>
        </section>

        <section className="gift-section">
          <GiftBox
            locked={!isAfterDeadline}
            isUnwrapped={isUnwrapped}
            onUnwrap={handleUnwrap}
          />
        </section>

        {isUnwrapped && (
          <section className="reveal-section">
            <RevealImage src={IMAGE_PATH} alt="Birthday surprise" message={REVEAL_MESSAGE} />
          </section>
        )}
      </main>
    </div>
  )
}

export default App

