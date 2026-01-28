type RevealImageProps = {
  src: string
  alt: string
  message?: string
}

export function RevealImage({ src, alt, message }: RevealImageProps) {
  return (
    <div className="reveal">
      <div className="reveal-image-wrapper">
        <img className="reveal-image" src={src} alt={alt} />
      </div>
      {message && <p className="reveal-message">{message}</p>}
    </div>
  )
}

