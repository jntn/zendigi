import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Stage, Layer } from 'react-konva'
import TimelineStore from '../stores/TimelineStore'
import Bar from './Bar'

interface Props {
  timelineStore?: typeof TimelineStore.Type
}

@inject('timelineStore')
@observer
class Timeline extends React.Component<Props> {
  render() {
    const events = this.props.timelineStore!.placedEvents
    const end = this.props.timelineStore!.end
    return (
      <Stage width={end} height={window.innerHeight}>
        <Layer>{events.map(x => <Bar key={x.id} event={x} />)}</Layer>
      </Stage>
    )
  }
}

export default Timeline
