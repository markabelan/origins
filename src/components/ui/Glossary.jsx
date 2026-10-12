import { useState } from 'react'

export default function Glossary({ term, definition, children }) {
  const [open, setOpen] = useState(false)

  return (
    <span className={`glossary${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="glossary__term"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onPointerEnter={() => setOpen(true)}
        onPointerLeave={() => setOpen(false)}
      >
        {children ?? term}
      </button>
      {open && (
        <span className="glossary__pop" role="tooltip">
          <strong>{term}</strong>
          {definition}
        </span>
      )}
    </span>
  )
}
