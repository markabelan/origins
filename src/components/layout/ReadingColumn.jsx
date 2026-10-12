import Glossary from '../ui/Glossary'

const TOKEN = /\{([^}|]+)\|([^}]+)\}/g

function renderBody(body) {
  if (!body) return null
  const blocks = body.split(/\n\n+/)

  return blocks.map((block, i) => {
    const nodes = []
    let last = 0
    const re = new RegExp(TOKEN.source, 'g')
    let match
    while ((match = re.exec(block))) {
      if (match.index > last) nodes.push(block.slice(last, match.index))
      nodes.push(
        <Glossary key={`${i}-${match.index}`} term={match[1]} definition={match[2]}>
          {match[1]}
        </Glossary>,
      )
      last = match.index + match[0].length
    }
    if (last < block.length) nodes.push(block.slice(last))
    const isPlaceholder = i === 0 && block.startsWith('PLACEHOLDER')
    return (
      <p key={i} className={isPlaceholder ? 'reading__placeholder' : undefined}>
        {nodes}
      </p>
    )
  })
}

export default function ReadingColumn({ heading, body, id }) {
  return (
    <div className="reading" id={id}>
      {heading && <h2 className="reading__heading">{heading}</h2>}
      <div className="reading__body">{renderBody(body)}</div>
    </div>
  )
}
