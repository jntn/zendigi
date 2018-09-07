import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import TimelineStore from './stores/TimelineStore'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import 'normalize.css'
import { Provider as ThemeProvider } from 'rebass'
import theme from './theme'

configure({ enforceActions: 'always', computedRequiresReaction: true })

const timelineStore = TimelineStore.create()

ReactDOM.render(
  <Provider timelineStore={timelineStore}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
