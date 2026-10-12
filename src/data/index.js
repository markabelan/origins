import hub from './hub.json'
import rnaWorld from './piece-rna-world.json'
import lipidsFirst from './piece-lipids-first.json'
import metabolismFirst from './piece-metabolism-first.json'
import theChase from './piece-the-chase.json'

export const pieces = {
  'rna-world': rnaWorld,
  'lipids-first': lipidsFirst,
  'metabolism-first': metabolismFirst,
  'the-chase': theChase,
}

export { hub }

export function getPiece(id) {
  return pieces[id] ?? null
}
