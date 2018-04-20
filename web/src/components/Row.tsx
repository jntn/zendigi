import * as React from 'react'
import { Group } from 'react-konva'
import { withTheme } from 'styled-components'
import { theme } from '../theme'
import EventEntry from '../stores/models/EventEntry'
import Bar from './Bar'

interface Props {
  events: typeof EventEntry.Type[]
  rowNumber: number
  theme?: typeof theme
}

class Row extends React.Component<Props> {
  render() {
    const { rowNumber, events, theme } = this.props
    return (
      <Group
        y={300 + (theme!.timeline.barHeight + theme!.space![2]) * rowNumber}
      >
        {events.map(x => <Bar key={x.id} event={x} />)}
      </Group>
    )
  }
}

export default withTheme(Row)
