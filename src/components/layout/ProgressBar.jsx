export default function ProgressBar({ progress = 0, visualStage }) {
  const pct = Math.min(100, Math.max(0, progress * 100))

  return (
    <div className="progress" data-stage={visualStage} aria-hidden="true">
      <div className="progress__track">
        <div className="progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
