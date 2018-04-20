import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Stage, Layer } from 'react-konva'
import { Motion, spring, presets } from 'react-motion'
import TimelineStore from '../stores/TimelineStore'
import Row from './Row'

interface Props {
  timelineStore?: typeof TimelineStore.Type
}

@inject('timelineStore')
@observer
class Timeline extends React.Component<Props> {
  render() {
    const rows = this.props.timelineStore!.eventsAsRows()
    const end = this.props.timelineStore!.end
    return (
      <Stage width={end} height={window.innerHeight}>
        <Motion
          defaultStyle={{ y: -50, opacity: 0 }}
          style={{
            y: spring(0, presets.gentle),
            opacity: spring(1)
          }}
        >
          {style => (
            <Layer y={style.y} opacity={style.opacity}>
              {rows.map((x, i) => <Row key={i} events={x} rowNumber={i} />)}
            </Layer>
          )}
        </Motion>
      </Stage>
    )
  }
}

export default Timeline
