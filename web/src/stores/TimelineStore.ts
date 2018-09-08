import { types, flow } from 'mobx-state-tree'
import { scaleTime } from 'd3-scale'
import { timeYear } from 'd3-time'
// import { GraphQLClient } from 'graphql-request'
import { extentWithRowPlacement } from '../helpers/time-helpers'
import Event from './models/Event'

// const client = new GraphQLClient('/api', { headers: {} })

// const eventQuery = `{
//   category(id: 1) {
//     id
//     events {
//       id
//       title
//       startTime
//       endTime
//     }
//   }
// }`

const timelineStore = types
  .model('TimelineStore', {
    start: types.optional(types.number, 0),
    end: types.optional(types.number, 0),
    events: types.optional(types.array(Event), []),
    domain: types.optional(types.array(types.Date), [new Date(), new Date()])
  })
  .views(self => {
    function scale() {
      return scaleTime()
        .domain(self.domain)
        .range([self.start, self.end])
    }

    return {
      get placedEvents() {
        return self.events
      },
      scale,
      get ticks() {
        return scale().ticks(timeYear)
      },
      get tickFormat() {
        return scale().tickFormat(0, '%Y')
      }
    }
  })
  .actions(self => {
    function setDomainToDefault() {
      const domainStart = self.events[0] && self.events[0].startTime
      const domainEnd =
        self.events[self.events.length - 1] &&
        self.events[self.events.length - 1].endTime

      self.domain.clear()
      self.domain.push(domainStart, domainEnd)
    }

    function updateEvents(json: any) {
      const rawEvents = json.events.map((x: any) => {
        return {
          id: x.id,
          title: x.title,
          startTime: new Date(x.startTime),
          endTime: new Date(x.endTime)
        }
      })
      extentWithRowPlacement(rawEvents)

      self.events = rawEvents

      setDomainToDefault()
    }

    const loadEvents = flow(function* loadEvents() {
      try {
        // const result = yield client.request(eventQuery)
        const json = yield fetch('/events.json').then(x => x.json())
        updateEvents(json)
      } catch (err) {
        console.error('Failed to load books ', err)
      }
    })

    function zoom(transform: any) {
      setDomainToDefault()
      const t = transform.rescaleX(self.scale()).domain()
      self.domain = t
    }

    function setWidth(width: number) {
      self.end = width
    }

    return {
      loadEvents,
      zoom,
      setWidth
    }
  })

export default timelineStore
