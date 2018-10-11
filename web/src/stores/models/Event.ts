import { types, getRoot, Instance } from 'mobx-state-tree'
import TimelineStore from '../TimelineStore'

const eventEntry = types
  .model('Event', {
    id: types.number,
    startTime: types.Date,
    endTime: types.Date,
    title: types.string,
    description: types.optional(types.string, ''),
    row: types.optional(types.number, 0)
  })
  .views(self => {
    function timeline() {
      return getRoot<Instance<typeof TimelineStore>>(self)
    }

    function start(): number {
      return timeline().scale()(self.startTime)
    }

    function end(): number {
      return timeline().scale()(self.endTime)
    }

    function width(): number {
      return end() - start()
    }

    return {
      start,
      end,
      width
    }
  })

export default eventEntry
