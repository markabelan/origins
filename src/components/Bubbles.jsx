const BUBBLES = Array.from({ length: 110 }, (_, i) => {
  const size = 3 + ((i * 11) % 7)
  return {
    id: i,
    left: `${((i * 9.1 + (i % 5) * 3.3) % 100)}%`,
    size,
    duration: 12 + ((i * 3) % 16),
    delay: -((i * 1.1) % 18),
    peak: 0.38 + ((i % 5) * 0.08),
    drift: ((i % 9) - 4) * 10,
  }
})

export default function Bubbles() {
  return (
    <div className="bubbles" aria-hidden="true">
      {BUBBLES.map((b) => (
        <span
          key={b.id}
          className="bubble"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            '--peak': b.peak,
            '--drift': `${b.drift}px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
