import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Stage, Group, Layer, Text } from 'react-konva'
import TimelineStore from '../stores/TimelineStore'
import { Instance } from 'mobx-state-tree'

import Bar from './Bar'

interface Props2 {
  timelineStore?: Instance<typeof TimelineStore>
}

@inject('timelineStore')
@observer
class Ticks extends Component<Props2> {
  render() {
    if (this.props.timelineStore == null) return null
    const zoomLevel = this.props.timelineStore!.zoomLevel
    const dayTicks = this.props.timelineStore!.dayTicks
    const dayTickFormat = this.props.timelineStore!.dayTickFormat
    const monthTicks = this.props.timelineStore!.monthTicks
    const monthTickFormat = this.props.timelineStore!.monthTickFormat
    const yearTicks = this.props.timelineStore!.yearTicks
    const yearTickFormat = this.props.timelineStore!.yearTickFormat
    const scale = this.props.timelineStore!.scale()

    return (
      <Group>
        {zoomLevel > 108 &&
          dayTicks.map(x => (
            <Text
              key={x.valueOf()}
              text={dayTickFormat(x)}
              y={29}
              x={scale(x)}
              fill="black"
              fontFamily="menlo"
              fontSize={10}
            />
          ))}
        {zoomLevel > 0.56 &&
          yearTicks.map(x => (
            <Text
              key={x.valueOf()}
              text={yearTickFormat(x)}
              y={9}
              x={scale(x)}
              fill="black"
              fontFamily="menlo"
              fontSize={10}
            />
          ))}
        {zoomLevel > 5.6 &&
          monthTicks.map(x => (
            <Text
              key={x.valueOf()}
              text={monthTickFormat(x)}
              y={19}
              x={scale(x)}
              fill="black"
              fontFamily="menlo"
              fontSize={10}
            />
          ))}
        <Ticks />
      </Group>
    )
  }
}

interface Props {
  timelineStore?: Instance<typeof TimelineStore>
}

@inject('timelineStore')
@observer
class Timeline extends Component<Props> {
  render() {
    const events = this.props.timelineStore!.placedEvents
    const end = this.props.timelineStore!.end

    return (
      <Stage width={end} height={window.innerHeight}>
        <Layer>
          <Ticks />
          {events.map(x => (
            <Bar key={x.id} event={x} />
          ))}
        </Layer>
      </Stage>
    )
  }
}

export default Timeline
