import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import TimelineStore from './stores/TimelineStore'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import { Provider as ThemeProvider } from 'rebass'

configure({ enforceActions: true, computedRequiresReaction: true })

const timelineStore = TimelineStore.create()

ReactDOM.render(
  <Provider timelineStore={timelineStore}>
    <ThemeProvider theme={{}}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
