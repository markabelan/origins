import { Link } from 'react-router-dom'
import { hub } from '../data'
import './Hub.css'

export default function Hub() {
  return (
    <div className="series">
      <section className="lede">
        <div className="lede__stage">
          <video
            className="lede__media"
            autoPlay
            muted
            loop
            playsInline
            poster="/media/hero-poster.png?v=3"
          >
            <source src="/media/hero.webm?v=3" type="video/webm" />
            <source src="/media/hero.mov?v=3" type='video/quicktime; codecs="hvc1"' />
          </video>
        </div>
        <div className="lede__copy">
          <p className="lede__kicker">{hub.kicker}</p>
          <h1 className="lede__title">{hub.title}</h1>
          <p className="lede__dek">{hub.dek}</p>
        </div>
      </section>

      <section className="stories" aria-label="Explainers">
        {hub.stories.map((story, index) => (
          <article key={story.id} className="story">
            <div className="story__inner">
              <Link
                className={`story__visual${story.id === 'lipids-first' ? ' story__visual--flip' : ''}`}
                to={`/piece/${story.id}`}
              >
                <img
                  className="wobble"
                  src={story.media}
                  alt=""
                  style={{ animationDelay: `${-index * 0.37}s` }}
                />
              </Link>
              <p className="kicker">{story.kicker}</p>
              <h2 className="story__title">
                <Link to={`/piece/${story.id}`}>{story.title}</Link>
              </h2>
              <p className="byline">
                <span className="byline__prefix">{story.bylinePrefix ?? 'By'}</span>{' '}
                <span className="byline__name">{story.author}</span>
              </p>
              <p className="story__dek">{story.dek}</p>
              <Link className="cta" to={`/piece/${story.id}`}>
                {story.cta}
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="chase-wrap">
        <div className="chase">
          <img
            className="chase__visual wobble"
            src={hub.chase.media}
            alt=""
            style={{ animationDelay: '-0.22s' }}
          />
          <div className="chase__copy">
            <p className="kicker">{hub.chase.kicker}</p>
            <h2 className="chase__title">
              <Link to={`/piece/${hub.chase.id}`}>{hub.chase.title}</Link>
            </h2>
            <p className="byline">
              <span className="byline__prefix">{hub.chase.bylinePrefix ?? 'By'}</span>{' '}
              <span className="byline__name">{hub.chase.author}</span>
            </p>
            <p className="chase__dek">{hub.chase.dek}</p>
            <Link className="cta" to={`/piece/${hub.chase.id}`}>
              {hub.chase.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
