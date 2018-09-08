import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Stage, Layer, Text } from 'react-konva'
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
    const ticks = this.props.timelineStore!.ticks
    const tickFormat = this.props.timelineStore!.tickFormat
    const scale = this.props.timelineStore!.scale

    return (
      <Stage width={end} height={window.innerHeight}>
        <Layer>
          {events.map(x => (
            <Bar key={x.id} event={x} />
          ))}
          {ticks.map(x => (
            <Text
              key={x.valueOf()}
              text={tickFormat(x)}
              y={9}
              x={scale()(x)}
              fill="black"
              fontFamily="menlo"
              fontSize={10}
            />
          ))}
        </Layer>
      </Stage>
    )
  }
}

export default Timeline
