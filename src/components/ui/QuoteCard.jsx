export default function QuoteCard({ speaker, role, text }) {
  return (
    <figure className="quote">
      <blockquote className="quote__text">“{text}”</blockquote>
      {(speaker || role) && (
        <figcaption className="quote__meta">
          {speaker && <span className="quote__speaker">{speaker}</span>}
          {role && <span className="quote__role">{role}</span>}
        </figcaption>
      )}
    </figure>
  )
}
