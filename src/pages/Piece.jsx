import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPiece, hub } from '../data'
import ProgressBar from '../components/layout/ProgressBar'
import ReadingColumn from '../components/layout/ReadingColumn'
import QuoteCard from '../components/ui/QuoteCard'
import Glossary from '../components/ui/Glossary'
import SectionDivider from '../components/ui/SectionDivider'
import ProtonGradient from '../components/scenes/ProtonGradient'
import { useScrollProgress } from '../hooks/useScrollProgress'
import './Piece.css'

const SCENES = {
  ProtonGradient,
}

function slugify(value, index) {
  return (
    String(value || `section-${index}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || `section-${index}`
  )
}

export default function Piece() {
  const { id } = useParams()
  const piece = getPiece(id)
  const articleRef = useRef(null)
  const progress = useScrollProgress(articleRef)

  const headings = useMemo(
    () =>
      (piece?.sections ?? [])
        .map((section, index) =>
          section.heading
            ? { id: slugify(section.heading, index), label: section.heading }
            : null,
        )
        .filter(Boolean),
    [piece],
  )

  if (!piece) {
    return (
      <div className="missing">
        <p>No piece with id “{id}”.</p>
        <Link to="/">Back to hub</Link>
      </div>
    )
  }

  const jump = (headingId) => {
    const el = document.getElementById(headingId)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const siblings = [hub.chase, ...hub.stories]
  const hubItem = siblings.find((item) => item.id === piece.id)
  const bylinePrefix = piece.bylinePrefix ?? hubItem?.bylinePrefix ?? 'By'
  const author = piece.author ?? hubItem?.author
  const others = siblings.filter((item) => item.id !== piece.id)

  return (
    <div className="article-page" ref={articleRef}>
      <ProgressBar progress={progress} />

      <article className="article">
        <header className="article__header">
          <div className="article__top">
            <p className="article__kicker">{piece.kicker}</p>
            {headings.length > 0 && <ArticleToc headings={headings} onJump={jump} />}
          </div>
          <h1 className="article__title">{piece.title}</h1>
          <p className="article__dek">{piece.dek}</p>
          {author && (
            <p className="article__byline">
              <span className="article__byline-prefix">{bylinePrefix}</span>{' '}
              <span className="article__byline-name">{author}</span>
            </p>
          )}
        </header>

        <div className="article__body">
          {piece.sections.map((section, index) => (
            <SectionBlock key={`${section.type}-${index}`} section={section} index={index} />
          ))}
        </div>
      </article>

      <aside className="recirc" aria-label="More in this issue">
        <p className="recirc__kicker">More in this issue</p>
        <div className="recirc__list">
          {others.map((item) => (
            <Link key={item.id} className="recirc__link" to={`/piece/${item.id}`}>
              <span>{item.kicker}</span>
              <strong>{item.title}</strong>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  )
}

function ArticleToc({ headings, onJump }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="article__toc">
      <button
        type="button"
        className="article__toc-btn"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Contents
      </button>
      {open && (
        <nav className="article__toc-list" aria-label="Table of contents">
          {headings.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onJump?.(item.id)
                setOpen(false)
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}

function SectionBlock({ section, index }) {
  const id = section.heading ? slugify(section.heading, index) : undefined

  return (
    <section className="article__section" data-type={section.type}>
      {section.type === 'text' && (
        <ReadingColumn id={id} heading={section.heading} body={section.body} />
      )}
      {section.type === 'quote' && (
        <QuoteCard speaker={section.speaker} role={section.role} text={section.text} />
      )}
      {section.type === 'glossaryTerm' && (
        <div className="glossary-block">
          <Glossary term={section.term} definition={section.definition}>
            {section.term}
          </Glossary>
          <p>{section.definition}</p>
        </div>
      )}
      {section.type === 'divider' && <SectionDivider label={section.label} />}
      {section.type === 'sceneBreak' && <SceneBreak section={section} />}
    </section>
  )
}

function SceneBreak({ section }) {
  const Scene = SCENES[section.component]
  if (!Scene) return null

  return (
    <figure className="scene-break">
      <Scene options={section.options} events={section.events} nodes={section.nodes} />
      {section.caption && <figcaption className="scene-caption">{section.caption}</figcaption>}
      {section.anchorQuote && (
        <blockquote className="scene-anchor">“{section.anchorQuote}”</blockquote>
      )}
    </figure>
  )
}
