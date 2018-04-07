import * as React from 'react'
import { observer } from 'mobx-react'
import { withTheme } from 'styled-components'
import { Group, Rect, Text } from 'react-konva'
import Event from '../stores/models/Event'
import { Theme } from 'rebass'

const barHeight = 30

interface Props {
  event: typeof Event.Type
  theme?: Theme
}

@observer
class Bar extends React.Component<Props> {
  render() {
    const { event: e, theme } = this.props
    return (
      <Group
        x={e.start()}
        y={300 + (barHeight + theme!.space![2]) * e.row}
        width={e.width()}
      >
        <Rect
          width={e.width()}
          height={32}
          fill={theme!.colors!.teal4}
          cornerRadius={15}
        />
        <Text
          text={e.title}
          y={9}
          x={10}
          fill="white"
          fontFamily={theme!.font!}
          fontSize={theme!.fontSizes![1]}
        />
      </Group>
    )
  }
}

export default withTheme(Bar)
