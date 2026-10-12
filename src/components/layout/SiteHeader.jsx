import { useState } from 'react'
import { Link } from 'react-router-dom'
import QuantaLogo from './QuantaLogo'
import './SiteChrome.css'

const MENU = [
  { label: 'Physics', href: 'https://www.quantamagazine.org/physics/' },
  { label: 'Mathematics', href: 'https://www.quantamagazine.org/mathematics/' },
  { label: 'Biology', href: 'https://www.quantamagazine.org/biology/' },
  { label: 'Computer Science', href: 'https://www.quantamagazine.org/computer-science/' },
  { label: 'Topics', href: 'https://www.quantamagazine.org/topics/' },
  { label: 'Archive', href: 'https://www.quantamagazine.org/archive/' },
]

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="qm-header">
      <div className="qm-header__inner">
        <Link className="qm-header__logo" to="/" aria-label="Quanta Magazine">
          <QuantaLogo variant="header" />
        </Link>

        <ul className="qm-header__tools">
          <li>
            <span className="qm-tool" aria-hidden="true" title="Login">
              <LoginIcon />
            </span>
          </li>
          <li>
            <span className="qm-tool" aria-hidden="true" title="Saved articles">
              <BookmarkIcon />
            </span>
          </li>
          <li>
            <button
              type="button"
              className={`qm-tool qm-tool--menu${menuOpen ? ' is-open' : ''}`}
              aria-label="Open the menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="qm-hamburger" aria-hidden="true">
                <span className="qm-hamburger__bar" />
                <span className="qm-hamburger__bar" />
                <span className="qm-hamburger__bar" />
              </span>
            </button>
          </li>
        </ul>
      </div>

      {menuOpen && (
        <div className="qm-menu">
          {MENU.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

function LoginIcon() {
  return (
    <svg viewBox="0 0 50 50" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M35.2 29.9c3.9-3.1 6.4-7.8 6.4-13.2C41.7 7.5 34.2 0 25 0S8.3 7.5 8.3 16.7c0 5.4 2.5 10.1 6.4 13.2C6.1 33.4 0 41.1 0 50h5.6c0-9.1 8.7-16.5 19.4-16.5S44.4 40.9 44.4 50H50c0-8.9-6.1-16.6-14.8-20.1zM25 5.6c6.1 0 11.1 5 11.1 11.2S31.1 28 25 28s-11.1-5-11.1-11.2S18.9 5.6 25 5.6z"
      />
    </svg>
  )
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 50 50" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M37.1,5.6v34.7l-8.9-5.1l-2.7-1.6l-2.8,1.5l-9.8,5.4V5.6H37.1 M42.7,0H7.3v50l18.1-9.9L42.7,50V0L42.7,0z"
      />
    </svg>
  )
}
