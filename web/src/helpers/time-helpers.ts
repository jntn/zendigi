import EventEntry from '../stores/models/EventEntry'
let rows: typeof EventEntry.Type[][]

const addToRow = function addToRow(event: typeof EventEntry.Type, i: number) {
  if (!rows[i]) rows[i] = []

  rows[i].push(event)
}

const getEventsBefore = function getEventsBefore(
  event: typeof EventEntry.Type,
  events: typeof EventEntry.Type[]
) {
  return events.filter((e: any) => {
    return e.startTime < event.startTime
  })
}

const getOverlappingEvents = function getOverlappingEvents(
  event: typeof EventEntry.Type,
  events: typeof EventEntry.Type[]
) {
  return events.filter(e => {
    return event.endTime > e.startTime && event.startTime < e.endTime
  })
}

const findRowWithoutOverlap = function findRowWithoutOverlap(
  event: typeof EventEntry.Type
) {
  let row = 0

  for (let i = 0; i < Object.keys(rows).length; i = i + 1) {
    const events = rows[i]
    const overlapping = getOverlappingEvents(event, events)

    if (!overlapping.length) {
      return i
    }
    row = row + 1
  }

  return row
}

export const getEventsAsRows = function getEventsAsRows(
  events: typeof EventEntry.Type[]
) {
  rows = []
  events.forEach((e, i) => {
    if (i === 0) addToRow(e, i)

    if (i !== 0) {
      const eventsBefore = getEventsBefore(e, events)
      const overlappingEvents = getOverlappingEvents(e, eventsBefore)

      if (overlappingEvents) {
        const row = findRowWithoutOverlap(e)
        addToRow(e, row)
      }

      if (!overlappingEvents) {
        addToRow(e, 0)
      }
    }
  })

  return rows
}
