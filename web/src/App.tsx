import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { zoom, ZoomBehavior } from 'd3-zoom'
import { event, select } from 'd3-selection'
import { Box } from 'rebass'
// import lodashDebounce from 'lodash.debounce'

import TimelineStore from './stores/TimelineStore'
import Timeline from './components/Timeline'
import Header from './components/Header'

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

    // const lazyZoom = lodashDebounce(() => {
    this.props.timelineStore!.zoom(transform)
    // }, 50)

    // lazyZoom()
  }

  componentDidMount() {
    this.props.timelineStore!.setWidth(this.app.clientWidth)
    select(this.app).call(this.zoom)
  }

  render() {
    return (
      <div>
        <Header />
        <Box p={2}>
          <div ref={app => (this.app = app!)}>
            <Timeline />
          </div>
        </Box>
      </div>
    )
  }
}

export default App
