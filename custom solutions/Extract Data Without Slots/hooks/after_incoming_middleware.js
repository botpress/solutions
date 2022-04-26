if (event.payload.type !== 'text' || typeof event.payload.text !== 'string') {
  return
}

const numbers =
  '(un|a|one|une|deux|two|trois|three|quatre|four|cinq|five|six|sept|seven|huit|eight|neuf|nine|dix|ten|\\d{1,2})\\s'
const regexRooms = new RegExp(`${numbers}([C|c]hambres?|[R|r]ooms?)`, 'gm')
const regexPeople = new RegExp(`${numbers}([P|p]ersonn?e?s?|[A|a]dulte?s?|[P|p]eople)`, 'gm')
const regexKids = new RegExp(`${numbers}([E|e]nfants?|[C|c]hildren|[K|k]ids?|[C|c]ild)`, 'gm')

const stringToNumber = {
  un: 1,
  one: 1,
  une: 1,
  deux: 2,
  two: 2,
  trois: 3,
  three: 3,
  quatre: 4,
  four: 4,
  cinq: 5,
  five: 5,
  six: 6,
  sept: 7,
  seven: 7,
  huit: 8,
  eight: 8,
  neuf: 9,
  nine: 9,
  dix: 10,
  ten: 10
}

const addToEntities = (regex, entityType, tempVariable) => {
  for (const match of event.payload.text.matchAll(regex)) {
    if (match[1] in stringToNumber) {
      match[1] = stringToNumber[match[1]]
    }

    event.nlu.entities.push({
      name: entityType,
      type: entityType,
      meta: {
        confidence: 1,
        start: match.index,
        end: match + match[0].length,
        sensitive: false,
        source: match[0]
      },

      data: {
        unit: match[2],
        value: match[1]
      }
    })
  }

  event.state.temp[tempVariable] = event.nlu.entities
    .filter((elt) => elt.type === entityType)
    .reduce((sum, elt) => parseInt(elt.data.value) + sum, 0)
}

addToEntities(regexRooms, 'rooms', 'totalRoom')
addToEntities(regexPeople, 'person', 'totalPerson')
addToEntities(regexKids, 'kids', 'totalChildren')
