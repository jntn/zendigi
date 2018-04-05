import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import TimelineStore from './stores/TimelineStore'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
// import * as makeInspectable from 'mobx-devtools-mst'

configure({ enforceActions: true, computedRequiresReaction: true })

const timelineStore = TimelineStore.create()

ReactDOM.render(
  <Provider timelineStore={timelineStore}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
