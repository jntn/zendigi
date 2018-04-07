import * as React from 'react'
import { inject, observer } from 'mobx-react'
import TimelineStore from './stores/TimelineStore'
import Timeline from './components/Timeline'
import { zoom, ZoomBehavior } from 'd3-zoom'
import { event, select } from 'd3-selection'

interface Props {
  timelineStore?: typeof TimelineStore.Type
}

@inject('timelineStore')
@observer
class App extends React.Component<Props> {
  private app: HTMLDivElement
  private zoom: ZoomBehavior<Element, {}>

  constructor(props: Props) {
    super(props)
    this.props.timelineStore!.loadEvents()

    this.zoom = zoom().on('zoom', this.zoomed.bind(this))
  }

  zoomed() {
    const transform = event.transform
    this.props.timelineStore!.zoom(transform)
  }

  componentDidMount() {
    this.props.timelineStore!.setWidth(this.app.clientWidth)
    select(this.app).call(this.zoom)
  }

  render() {
    return (
      <div ref={app => (this.app = app!)}>
        <Timeline />
      </div>
    )
  }
}

export default App
