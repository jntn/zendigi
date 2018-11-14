import * as React from 'react'
import { observer } from 'mobx-react'
import { Group, Rect, Text } from 'react-konva'
import Event from '../stores/models/Event'

const barHeight = 30

interface Props {
  event: typeof Event.Type
}

@observer
class Bar extends React.Component<Props> {
  render() {
    const { event: e } = this.props
    return (
      <Group x={e.start()} y={300 + (barHeight + 8) * e.row} width={e.width()}>
        <Rect
          width={e.width()}
          height={32}
          fill="palevioletred"
          cornerRadius={15}
        />
        <Text
          text={e.title}
          y={9}
          x={10}
          fill="white"
          fontFamily="menlo"
          fontSize={14}
        />
      </Group>
    )
  }
}

export default Bar
