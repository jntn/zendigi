let rows = {}

const addToRow = function addToRow(event: any, i: number) {
  if (!rows[i]) rows[i] = []

  rows[i].push(event)
  event.row = i
}

const getEventsBefore = function getEventsBefore(event: any, events: any) {
  return events.filter((e: any) => {
    return e.startTime < event.startTime
  })
}

const getOverlappingEvents = function getOverlappingEvents(
  event: any,
  events: any
) {
  return events.filter((e: any) => {
    return event.endTime > e.startTime && event.startTime < e.endTime
  })
}

const findRowWithoutOverlap = function findRowWithoutOverlap(event: any) {
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

export const extentWithRowPlacement = function extentWithRowPlacement(
  events: any
) {
  rows = {}
  events.forEach((e: any, i: any) => {
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
}

export const extendWithHorizatalPlacement = function extendWithHorizatalPlacement(
  event: any,
  events: any,
  scale: any
) {
  event.yStart = scale(event.startTime)
  event.yEnd = scale(event.endTime)

  return event
}
