import * as React from 'react'
import { observer } from 'mobx-react'
import { withTheme } from 'styled-components'
import { Group, Rect, Text } from 'react-konva'
import EventEntry from '../stores/models/EventEntry'
import { Theme } from 'rebass'

interface Props {
  event: typeof EventEntry.Type
  theme?: Theme
}

@observer
class Bar extends React.Component<Props> {
  render() {
    const { event: e, theme } = this.props
    return (
      <Group x={e.start()} width={e.width()}>
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
