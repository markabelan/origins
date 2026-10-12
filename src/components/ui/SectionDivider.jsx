export default function SectionDivider({ label }) {
  return (
    <div className="divider" role="separator">
      <span className="divider__rule" />
      {label && <span className="divider__label">{label}</span>}
      <span className="divider__rule" />
    </div>
  )
}
