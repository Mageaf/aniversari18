type GiftBoxProps = {
  locked: boolean
  isUnwrapped: boolean
  onUnwrap: () => void
}

export function GiftBox({ locked, isUnwrapped, onUnwrap }: GiftBoxProps) {
  const stateClass = locked
    ? 'gift-box--locked'
    : isUnwrapped
      ? 'gift-box--opened'
      : 'gift-box--ready'

  const label = locked
    ? 'Gift box locked until countdown ends'
    : isUnwrapped
      ? 'Gift box opened'
      : 'Open your birthday gift'

  const handleActivate = () => {
    if (locked || isUnwrapped) return
    onUnwrap()
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleActivate()
    }
  }

  return (
    <div className="gift-container">
      <div
        className={`gift-box ${stateClass}`}
        role="button"
        tabIndex={locked ? -1 : 0}
        aria-label={label}
        aria-disabled={locked}
        onClick={handleActivate}
        onKeyDown={handleKeyDown}
      >
        <div className="gift-box-lid" />
        <div className="gift-box-body" />
        <div className="gift-box-ribbon-vertical" />
        <div className="gift-box-ribbon-horizontal" />
      </div>
      {!locked && !isUnwrapped && <p className="gift-callout">Tap or click to unwrap</p>}
      {locked && <p className="gift-callout">Soon...</p>}
    </div>
  )
}

