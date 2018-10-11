import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Stage, Layer, Text } from 'react-konva'
import TimelineStore from '../stores/TimelineStore'
import { Instance } from 'mobx-state-tree';

import Bar from './Bar'


@inject('timelineStore')
@observer
class DayTicks extends Component<{ timelineStore?: Instance<typeof TimelineStore> }> {
  render() {
    const zoomLevel = this.props.timelineStore!.zoomLevel
    console.log(zoomLevel);

    if (zoomLevel < 108) return null

    console.log('hej');


    const dayTicks = this.props.timelineStore!.dayTicks
    const dayTickFormat = this.props.timelineStore!.dayTickFormat
    const scale = this.props.timelineStore!.scale

    return dayTicks.map(x => (
      <Text
        key={x.valueOf()}
        text={dayTickFormat(x)}
        y={29}
        x={scale()(x)}
        fill="black"
        fontFamily="menlo"
        fontSize={10}
      />
    ))
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
    const yearTicks = this.props.timelineStore!.yearTicks
    const monthTicks = this.props.timelineStore!.monthTicks
    const yearTickFormat = this.props.timelineStore!.yeattickFormat
    const monthTickFormat = this.props.timelineStore!.monthTickFormat
    const scale = this.props.timelineStore!.scale
    const zoomLevel = this.props.timelineStore!.zoomLevel

    // console.log(zoomLevel);


    return (
      <Stage width={end} height={window.innerHeight}>
        <Layer>
          {events.map(x => (
            <Bar key={x.id} event={x} />
          ))}
          {zoomLevel > 0.56 && yearTicks.map(x => (
            <Text
              key={x.valueOf()}
              text={yearTickFormat(x)}
              y={9}
              x={scale()(x)}
              fill="black"
              fontFamily="menlo"
              fontSize={10}
            />
          ))}
          {zoomLevel > 5.6 && monthTicks.map(x => (
            <Text
              key={x.valueOf()}
              text={monthTickFormat(x)}
              y={19}
              x={scale()(x)}
              fill="black"
              fontFamily="menlo"
              fontSize={10}
            />
          ))}
          <DayTicks />
        </Layer>
      </Stage>
    )
  }
}

export default Timeline
