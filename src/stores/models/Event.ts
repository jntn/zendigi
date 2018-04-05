import { types, getRoot } from 'mobx-state-tree'

const eventEntry = types
  .model('Event', {
    id: types.number,
    startTime: types.Date,
    endTime: types.Date,
    title: types.string,
    description: types.optional(types.string, '')
  })
  .views(self => {
    function timeline() {
      return getRoot(self)
    }
    return {
      get start() {
        return timeline().scale()(self.startTime)
      },
      get end() {
        return timeline().scale()(self.endTime)
      }
    }
  })

export default eventEntry
