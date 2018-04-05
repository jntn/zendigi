import * as React from 'react'
import { inject, observer } from 'mobx-react'
import TimelineStore from './stores/TimelineStore'

interface Props {
  timelineStore?: typeof TimelineStore.Type
}

@inject('timelineStore')
@observer
class App extends React.Component<Props> {
  private app: HTMLDivElement
  constructor(props: Props) {
    super(props)
    this.props.timelineStore!.loadEvents()
  }

  componentDidMount() {
    this.props.timelineStore!.setWidth(this.app.clientWidth)
    this.app.clientWidth
  }

  render() {
    const events = this.props.timelineStore!.events
    return (
      <div ref={app => (this.app = app!)}>
        {events.map(x => (
          <div>
            {x.title} {x.start}
          </div>
        ))}
      </div>
    )
  }
}

export default App
