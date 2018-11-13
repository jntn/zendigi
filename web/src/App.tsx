import * as React from 'react'
import { createRef } from 'react'
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
  private app = createRef<HTMLDivElement>()
  private zoom: ZoomBehavior<HTMLDivElement, {}>

  constructor(props: Props) {
    super(props)
    this.props.timelineStore!.loadEvents()

    this.zoom = zoom<HTMLDivElement, {}>().on('zoom', this.zoomed.bind(this))
  }

  zoomed() {
    const transform = event.transform

    // const lazyZoom = lodashDebounce(() => {
    this.props.timelineStore!.zoom(transform)
    // }, 50)

    // lazyZoom()
  }

  componentDidMount() {
    if (this.app.current) {
      this.props.timelineStore!.setWidth(this.app.current.clientWidth)
      select(this.app.current).call(this.zoom)
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Box p={2}>
          <div ref={this.app}>
            <Timeline />
          </div>
        </Box>
      </div>
    )
  }
}

export default App
