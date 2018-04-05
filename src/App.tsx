import * as React from 'react'
import { inject, observer } from 'mobx-react'
import TimelineStore from './stores/TimelineStore'

interface Props {
  timelineStore?: typeof TimelineStore.Type
}

@inject('timelineStore')
@observer
class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.props.timelineStore!.loadEvents()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
